import history from './helpers/history';

export function loginAction(credentials) {
  return function (dispatch) {
    return loginRemotely(credentials)
      .then((response) => {
        // ...
        history.push('/');
      });
  };
}
