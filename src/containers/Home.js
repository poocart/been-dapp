import React from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { ethers } from 'ethers';
import { Storage, STORAGE_KEYS } from '../services/storage';

type State = {
  redirectToReferrer: boolean,
  checkRewriteModalOpen: boolean,
};

const checkIfValidPK = (pk) => {
  try {
    new ethers.Wallet(pk);
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

  componentDidMount() {
    const { match } = this.props;
    const pk = match.params.pk;
    const isValidPK = checkIfValidPK(pk);

    if (!isValidPK) return;

    const existingPk = Storage.get(STORAGE_KEYS.PRIVATE_KEY, '');
    if (pk && isValidPK) {
      if (!existingPk) {
        Storage.set(STORAGE_KEYS.PRIVATE_KEY, pk);
        this.login();
      } else {
        if (existingPk !== pk && pk !== 'loggedIn') {
          this.toggleCheckModal(true);
        } else {
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
