import React from 'react';
import { createGlobalStyle } from 'styled-components'

import LoggedIn from './LoggedIn';
import Home from './Home';
import Agenda from './Agenda';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import Profile from './Profile';
import { HeaderBlock } from '../components/HeaderBlock';

import { Storage, STORAGE_KEYS } from '../services/storage';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Karla&display=swap');
  * {
    margin: 0;
    padding: 0;
    font-family: Karla;
  }
  input:focus {
    outline: none;
  }
  html, body {
    overflow: hidden;
  }
  body {
    background-color: #f9f9f9;
    padding: 20px;
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route exact {...rest} render={(props) => {
    return (
      Storage.isStored(STORAGE_KEYS.PRIVATE_KEY)
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/signup',
          state: { from: props.location },
        }} />
    )
  }} />
);

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <GlobalStyle />
        <div>
          <HeaderBlock/>
          <PrivateRoute path='/' component={LoggedIn} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/agenda' component={Agenda} />
          <Route exact path="/:pk" component={Home} />
        </div>
      </Router>
    )
  }
}
