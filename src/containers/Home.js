import React from 'react';
import get from 'lodash.get';
import Modal from 'react-responsive-modal';
import { ethers } from 'ethers';
import { Redirect } from 'react-router-dom';
import { Storage, STORAGE_KEYS } from '../services/storage';
import smartWalletService from '../services/wallet';
import HeaderBlock from "../components/HeaderBlock";

type State = {
  redirectToReferrer: boolean,
  checkRewriteModalOpen: boolean,
};

let smartAccount;
const checkIfValidPK = async (pk) => {
  try {
    new ethers.Wallet(pk);
    await smartWalletService.init(pk);
    const accounts = await smartWalletService.getAccounts();
    if (!accounts.length || !get(accounts, '[0].address')) return false;
    smartAccount = accounts[0];
    await smartWalletService.connectAccount(smartAccount.address);
    return true;
  }
  catch(error) {
    return false;
  }
};

export default class Home extends React.Component<*, State> {
  state = {
    redirectToReferrer: false,
    checkRewriteModalOpen: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const pk = match.params.pk;
    const isValidPK = await checkIfValidPK(pk);

    if (!isValidPK) return;

    const existingPk = Storage.get(STORAGE_KEYS.PRIVATE_KEY, '');
    const existingPublicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    if (pk && isValidPK) {
      if (!existingPk) {
        Storage.set(STORAGE_KEYS.PRIVATE_KEY, pk);
        Storage.set(STORAGE_KEYS.PUBLIC_KEY, smartAccount.address);
        this.login();
      } else {
        if (existingPk !== pk && pk !== 'loggedIn') {
          this.toggleCheckModal(true);
        } else {
          if (!existingPublicKey) {
            Storage.set(STORAGE_KEYS.PUBLIC_KEY, smartAccount.address);
          }
          this.setState({ redirectToReferrer: true });
        }
      }
    }
  }

  login = () => {
    this.setState(() => ({
      redirectToReferrer: true
    }))
  };

  toggleCheckModal = (shouldShow: boolean) => {
    this.setState({
      checkRewriteModalOpen: !!shouldShow,
      redirectToReferrer: !shouldShow,
    });
  };

  addNewBurnerWallet = () => {
    const { match } = this.props;
    const pk = match.params.pk;
    Storage.set(STORAGE_KEYS.PRIVATE_KEY, pk);
    this.login();
  };

  render() {
    const { redirectToReferrer, checkRewriteModalOpen } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={{ pathname: '/' }} />
    }

    return (
      <div>
        <HeaderBlock />
        <Modal open={!!checkRewriteModalOpen} onClose={() => this.toggleCheckModal(false)} center>
          <p>You already have a burner wallet added</p>
          <button onClick={() => this.toggleCheckModal(false)}>
            Keep this one
          </button>
          <button onClick={this.addNewBurnerWallet}>
            Burn this and add new
          </button>
        </Modal>
      </div>
    )
  }
}
