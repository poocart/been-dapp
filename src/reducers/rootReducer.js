// @flow
import { combineReducers } from 'redux';
import walletReducer from './walletReducer';

const appReducer = combineReducers({
  wallet: walletReducer,
});

export default appReducer;
