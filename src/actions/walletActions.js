// @flow

import smartWalletService from '../services/wallet';
import { SET_BALANCE, INIT_WALLET_SDK } from '../constants/walletConstants';
import get from 'lodash.get';

export const fetchBalanceAction = () => {
  return async (dispatch: Function) => {
    const balance = await smartWalletService.getAccountBalance();
    dispatch({
      type: SET_BALANCE,
      payload: balance.toString(),
    });
  };
};

export const initSdkAction = (pk: string) => {
  return async (dispatch: Function) => {
    await smartWalletService.init(pk);
    const accounts = await smartWalletService.getAccounts();
    if (!accounts.length || !get(accounts, '[0].address')) return false;
    await smartWalletService.connectAccount(accounts[0].address);

    dispatch({
      type: INIT_WALLET_SDK,
      payload: true,
    });
  };
};
