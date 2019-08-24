import React from 'react';
import { withRouter } from 'react-router-dom';
import { Storage, STORAGE_KEYS } from '../services/storage';
import { ApiService, ENDPOINTS } from '../services/api';
import HeaderBlock from "../components/HeaderBlock";

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

    fetch('http://www.mocky.io/v2/5d6146c232000063008e6084')
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
        {agenda.map((event) => {
          return (
            <div key={event.id}>
              <p>{event.time}</p>
              <p>{event.title}</p>
              <p>{event.area}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(Agenda)
