// @flow
import {
  SET_BALANCE,
} from '../constants/walletConstants';

export type WalletReducerState = {
  balance: string,
}

export type WalletReducerAction = {
  type: string,
  payload?: any,
};

const initialState = {
  balance: '',
};

export default function walletReducer(
  state: WalletReducerState = initialState,
  action: WalletReducerAction,
) {
  switch (action.type) {
    case SET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
}
