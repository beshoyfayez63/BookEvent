import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { reducers, initialState } from './user-reducers';
import jwtDecode from 'jwt-decode';

import { getDataLocalStorage } from '../../util/helper';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ...reducers,
  },
});

export const {
  loadUser,
  getUser,
  getError,
  clearError,
  logout,
} = userSlice.actions;

// EXPORT AND MAKE ASYNC FUNCTIONS
export const authFetchData = (data, state) => {
  console.log(state);
  return async (dispatch) => {
    dispatch(loadUser());
    try {
      const result = await axios({
        method: 'POST',
        data: data,
        url: 'http://localhost:8000/graphql',
      });
      console.log(result);
      if (state === 'login') {
        dispatch(getUser(result.data.data.login));
        localStorage.setItem('token', result.data.data.login.token);
        localStorage.setItem('uid', result.data.data.login.userId);
      }
      dispatch(clearError());
    } catch (err) {
      console.log(err.response.data.errors[0].message);
      console.log(err.response.data.errors[0].message);
      dispatch(getError(err.response.data.errors[0].message));
    }
  };
};

export const checkAuth = () => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, 1 * 3.6e6);
};

export const checkAuthState = () => (dispatch) => {
  const { token, userId } = getDataLocalStorage();
  if (!token) {
    dispatch(logout());
  } else {
    const expDate = new Date().getTime() + jwtDecode(token).exp;
    if (expDate < new Date().getTime()) {
      dispatch(logout());
    } else {
      dispatch(getUser({ token, userId, tokenExpiration: 1 }));
      dispatch(checkAuth());
    }
  }
};

// EXPORT ALL STATES
export const loading = (state) => state.user.loading;
export const token = (state) => state.user.userData.token;
export const userId = (state) => state.user.userData.userId;
export const tokenExpiration = (state) => state.user.userData.tokenExpiration;
export const error = (state) => state.user.error;

export default userSlice.reducer;
