import React from 'react';
import LoggedIn from './LoggedIn';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Storage, STORAGE_KEYS } from "../services/storage";

const AuthButton = withRouter(({ history }) => {
  const existingPk = Storage.get(STORAGE_KEYS.PRIVATE_KEY);
  return (
    !!existingPk ? (
      <button onClick={() => {
        history.push('/');
        Storage.reset();
      }}
      >
        Sign out
      </button>
    ) : (
      <p>Not logged in</p>
    )
  )
});
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (
      Storage.isStored(STORAGE_KEYS.PRIVATE_KEY)
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
    )
  }} />
);

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton/>
          {/*<ul>*/}
            {/*<li><Link to="/">Home Page</Link></li>*/}
          {/*</ul>*/}
          <PrivateRoute exact path='/loggedIn' component={LoggedIn} />
          <Route exact path="/:pk" component={Home} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  }
}
