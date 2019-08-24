import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { connect, Provider } from 'react-redux';

import LoggedIn from './LoggedIn';
import Home from './Home';
import AgendaScreen from './Agenda';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Profile from './Profile';

import { Storage, STORAGE_KEYS } from '../services/storage';
import configureStore from '../configureStore';
import { initSdkAction } from '../actions/walletActions';
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

type State = {
  needToInitialize: boolean,
};

class App extends React.Component<{}, State> {
  privateKey;

  constructor(props) {
    super(props);
    this.privateKey = Storage.get(STORAGE_KEYS.PRIVATE_KEY, '');
    const needToInitialize = !!this.privateKey;
    this.state = {
      needToInitialize,
    };
  }

  componentDidMount() {
    if (this.state.needToInitialize) {
      this.props.initSdk(this.privateKey);
    }
  }

  render() {
    const { needToInitialize } = this.state;
    const { isSdkInitialized } = this.props;

    return (
      <div>
        {!isSdkInitialized && needToInitialize && (
          <div>Loading...</div>
        )}
        {(isSdkInitialized || !needToInitialize) && (
          <Router>
            <GlobalStyle />
            <Switch>
              <PrivateRoute exact path='/' component={LoggedIn} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/agenda' component={AgendaScreen} />
              <Route path="/:pk" component={Home} />
            </Switch>
          </Router>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({
  wallet: { isSdkInitialized },
}) => ({
  isSdkInitialized,
});

const mapDispatchToProps = (dispatch) => ({
  initSdk: (pk: string) => dispatch(initSdkAction(pk)),
});

const AppWithState = connect(mapStateToProps, mapDispatchToProps)(App);


const AppRoot = () => (
  <Provider store={store}>
    <AppWithState />
  </Provider>
);

export default AppRoot;

