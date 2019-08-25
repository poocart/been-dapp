import React from 'react';
import { Storage, STORAGE_KEYS } from '../services/storage';
import HeaderBlock from '../components/HeaderBlock';
import { Agenda } from '../components/Agenda';
import { TopNav } from "../components/TopNav";
import { ENDPOINTS } from "../services/api";

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

    fetch(ENDPOINTS.GET_AGENDA)
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
        <TopNav title="Agenda" />
        <Agenda agenda={agenda} />
      </div>
    )
  }
}

export default AgendaScreen
