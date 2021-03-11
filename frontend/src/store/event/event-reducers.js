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

  eventById: (state, action) => {
    state.event =
      state.events.find((event) => event._id === action.payload) || null;
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
