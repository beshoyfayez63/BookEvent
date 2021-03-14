export const reducers = {
  loadEvent: (state) => {
    state.loading = true;
  },
  createEvent: (state, action) => {
    const { event, userId } = action.payload;
    state.events.push({ ...event, creator: { _id: userId } });
  },
  fetchEvents: (state, action) => {
    state.events = action.payload;
  },
  clearError: (state) => {
    state.loading = false;
    state.error = null;
  },
  getError: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
};
