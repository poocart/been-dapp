import React from 'react';
import { withRouter } from 'react-router-dom';
import { Storage, STORAGE_KEYS } from '../services/storage';
import { ApiService, ENDPOINTS } from '../services/api';

type State = {
  redirectToReferrer: boolean,
  checkRewriteModalOpen: boolean,
};

class Agenda extends React.Component<*, State> {
  state = {
    agenda: []
  };

  componentDidMount() {
    if (!Storage.isStored(STORAGE_KEYS.PRIVATE_KEY)) this.props.history.push('/');

    ApiService
      .get(ENDPOINTS.GET_AGENDA)
      .then(agenda => this.setState({ agenda }));
  }

  render() {
    return (
      <div>
        <p>Agenda</p>
      </div>
    )
  }
}

export default withRouter(Agenda)
