// @flow

import smartWalletService from '../services/wallet';
import { SET_BALANCE } from '../constants/walletConstants';

export const fetchBalanceAction = () => {
  return async (dispatch: Function) => {
    const balance = await smartWalletService.getAccountBalance();
    dispatch({
      type: SET_BALANCE,
      payload: balance.toString(),
    });
  };
};
