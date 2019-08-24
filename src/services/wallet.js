// @flow
import get from 'lodash.get';
import {
  SdkEnvironmentNames,
  getSdkEnvironment,
  createSdk,
  Sdk,
} from '@archanova/sdk';
import { toChecksumAddress } from '@netgum/utils';
import { BigNumber } from 'bignumber.js';

const NETWORK_PROVIDER = 'ropsten';
const TOKEN_ADDRESS = '0xF383e4C078b34Da69534A7B7F1F381d418315273';

class Wallet {
  sdk: Sdk;
  sdkInitialized: boolean = false;

  constructor() {
    const environmentNetwork = this.getEnvironmentNetwork(NETWORK_PROVIDER);
    const sdkOptions = getSdkEnvironment(environmentNetwork);

    try {
      this.sdk = createSdk(sdkOptions);
    } catch (err) {
      this.handleError(err);
    }
  }

  getEnvironmentNetwork(networkName: string) {
    switch (networkName) {
      case 'rinkeby': return SdkEnvironmentNames.Rinkeby;
      case 'ropsten': return SdkEnvironmentNames.Ropsten;
      case 'homestead': return SdkEnvironmentNames.Main;
      default: return SdkEnvironmentNames.Ropsten;
    }
  }

  async init(privateKey: string, dispatch?: Function) {
    if (this.sdkInitialized) return;

    await this.sdk
      .initialize({ device: { privateKey } })
      .then(() => { this.sdkInitialized = true; })
      .catch(this.handleError);
  }

  async getAccounts() {
    const accounts = await this.sdk.getConnectedAccounts()
      .then(({ items = [] }) => items)
      .catch(() => []);

    if (!accounts) {
      return [];
    }

    return accounts;
  }

  async connectAccount(address: string) {
    const account = this.sdk.state.account || await this.sdk.connectAccount(address).catch(this.handleError);
    const devices = await this.sdk.getConnectedAccountDevices()
      .then(({ items = [] }) => items)
      .catch(this.handleError);

    return {
      ...account,
      devices,
    };
  }

  getAccountRealBalance() {
    return get(this.sdk, 'state.account.balance.real', new BigNumber(0));
  }

  getAccountVirtualBalance() {
    return get(this.sdk, 'state.account.balance.virtual', new BigNumber(0));
  }

  getAccountBalance(): BigNumber {
    return this.sdk.getConnectedAccountVirtualBalance(TOKEN_ADDRESS)
      .then(data => {
        let value;
        if (data.items) { // NOTE: we're getting the data.items response when tokenAddress is null
          value = get(data, 'items[0].value');
        } else {
          value = get(data, 'value');
        }
        return value || new BigNumber(0);
      })
      .catch((e) => {
        this.handleError(e);
        return new BigNumber(0);
      });
  }

  getAccountPendingBalances() {
    return this.sdk.getConnectedAccountVirtualPendingBalances()
      .catch((e) => {
        this.handleError(e);
        return [];
      });
  }

  async fetchConnectedAccount() {
    const { state: { account } } = this.sdk;
    const devices = await this.sdk.getConnectedAccountDevices().catch(this.handleError);
    return {
      ...account,
      devices,
    };
  }

  async transferAsset(transaction: AccountTransaction) {
    let estimateError;
    const {
      recipient,
      value,
      data,
      transactionSpeed,
    } = transaction;

    const estimatedTransaction = await this.sdk.estimateAccountTransaction(
      recipient,
      value,
      data,
      transactionSpeed,
    ).catch((e) => { estimateError = e; });

    if (!estimatedTransaction) {
      return Promise.reject(new Error(estimateError));
    }

    return this.sdk.submitAccountTransaction(estimatedTransaction);
  }

  createAccountPayment(recipient: string, token: ?string, value: BigNumber) {
    return this.sdk.createAccountPayment(recipient, toChecksumAddress(token), value.toHexString());
  }

  getConnectedAccountTransaction(txHash: string) {
    return this.sdk.getConnectedAccountTransaction(txHash);
  }

  searchAccount(address: string) {
    return this.sdk.searchAccount({ address });
  }

  async getAccountPayments(lastSyncedHash: ?string, page?: number = 0) {
    const data = await this.sdk.getConnectedAccountPayments(page).catch(this.handleError);
    if (!data) return [];

    const foundLastSyncedTx = lastSyncedHash
      ? data.items.find(({ hash }) => hash === lastSyncedHash)
      : null;
    if (data.nextPage && !foundLastSyncedTx) {
      return [...data.items, ...(await this.getAccountPayments(lastSyncedHash, page + 1))];
    }

    return data.items;
  }

  handleError(error: any) {
    console.error('SmartWallet handleError: ', error);
  }
}

export default new Wallet();
