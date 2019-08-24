import React from "react";
import { Redirect } from 'react-router-dom';

const PK = 'pk';

export default class Home extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const pk = match.params.pk;
    const existingPk = localStorage.getItem(PK);
    if (pk) {
      if (!existingPk) {
        localStorage.setItem(PK, pk);
        this.login();
      } else {
        this.setState({ redirectToReferrer: true })
      }
    } else if (existingPk) {
      this.login();
    }
  }

  login = () => {
    this.setState(() => ({
      redirectToReferrer: true
    }))
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>Content for not logged user</p>
      </div>
    )
  }
}
