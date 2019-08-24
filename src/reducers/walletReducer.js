// @flow
import {
  INIT_WALLET_SDK,
  SET_BALANCE,
} from '../constants/walletConstants';

export type WalletReducerState = {
  balance: string,
  isSdkInitialized: boolean,
}

export type WalletReducerAction = {
  type: string,
  payload?: any,
};

const initialState = {
  balance: '',
  isSdkInitialized: false,
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
    case INIT_WALLET_SDK:
      return {
        ...state,
        isSdkInitialized: action.payload,
      };
    default:
      return state;
  }
}
