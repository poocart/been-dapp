import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { connect, Provider } from 'react-redux';

import LoggedIn from './LoggedIn';
import Home from './Home';
import AgendaScreen from './Agenda';
import Quizes from './Quizes';
import Quiz from './Quiz';
import Badges from './Badges';
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
import Loading from '../components/Loading';

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
    font-family: Karla;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Square = styled.div`
  display: inline-block;
  width: 60vw;
  height: 60vw;
  border: 4px solid black;
  animation: ${rotate} 3s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -30vw;
  margin-left: -30vw;
  z-index: 2;
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

const LoadingWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.p`
  margin-bottom: 25px;
  font-size: 26px;
  font-weight: 700;
`;

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
        <GlobalStyle />
        {!isSdkInitialized && needToInitialize && (
          <LoadingWrapper>
            <LoadingText>Loading...</LoadingText>
            <img src={randomLoadingGif()} />
            <Square />
          </LoadingWrapper>
        )}
        {(isSdkInitialized || !needToInitialize) && (
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={LoggedIn} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/agenda' component={AgendaScreen} />
              <PrivateRoute exact path='/quizes' component={Quizes} />
              <PrivateRoute exact path='/quizes/:quizName' component={Quiz} />
              <PrivateRoute exact path='/badges' component={Badges} />
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

