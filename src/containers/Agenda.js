import React from 'react';
import { Storage, STORAGE_KEYS } from '../services/storage';
import { ApiService, ENDPOINTS } from '../services/api';
import HeaderBlock from '../components/HeaderBlock';
import { Agenda } from '../components/Agenda';

type State = {
  redirectToReferrer: boolean,
  checkRewriteModalOpen: boolean,
};

class AgendaScreen extends React.Component<*, State> {
  state = {
    agenda: []
  };

  componentDidMount() {
    if (!Storage.isStored(STORAGE_KEYS.PRIVATE_KEY)) this.props.history.push('/');

    fetch('http://www.mocky.io/v2/5d618e563200005d008e6126')
      .then(response => response.json())
      .then(json => {
        this.setState({ agenda: json })
      })
      .catch(() => {})
  }

  render() {
    const { agenda } = this.state;
    return (
      <div>
        <HeaderBlock />
        <p>Agenda</p>
        <Agenda agenda={agenda} />
      </div>
    )
  }
}

export default AgendaScreen
