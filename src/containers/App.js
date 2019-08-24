import React from 'react';
import LoggedIn from './LoggedIn';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const PK = 'pk';

const AuthButton = withRouter(({ history }) => {
  const existingPk = localStorage.getItem(PK);
  return (
    !!existingPk ? (
      <button onClick={() => {
        history.push('/');
        localStorage.clear();
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
    const hasPkAdded = !!localStorage.getItem(PK);
    return (
      hasPkAdded
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
