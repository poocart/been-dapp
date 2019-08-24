import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

import LoggedIn from './LoggedIn';
import Home from './Home';
import Agenda from './Agenda';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Profile from './Profile';

import { Storage, STORAGE_KEYS } from '../services/storage';
import configureStore from '../configureStore';
const store = configureStore();

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
      <Provider store={store}>
        <Router>
          <GlobalStyle />
          <Switch>
            <PrivateRoute exact path='/' component={LoggedIn} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/agenda' component={Agenda} />
            <Route path="/:pk" component={Home} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
