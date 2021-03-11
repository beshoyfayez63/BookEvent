export const initialState = {
  loading: false,
  userData: {
    token: null,
    userId: null,
    tokenExpiration: 0,
  },
  error: null,
};

export const reducers = {
  loadUser: (state) => {
    state.loading = true;
  },
  getUser: (state, action) => {
    state.userData = action.payload;
  },
  clearError: (state) => {
    state.loading = false;
    state.error = null;
  },
  getError: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  logout: (state) => {
    state.userData = initialState.userData;
    // if (getDataLocalStorage().token || getDataLocalStorage().userId) {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('uid');
    // }
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  },
};
