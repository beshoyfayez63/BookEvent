const reducers = {
  loadBooking: (state) => {
    state.loading = true;
    state.error = null;
  },
  createBooking: (state, action) => {
    state.loading = false;
    state.bookings.push(action.payload);
  },
  isBooked: (state, action) => {
    const { eventId, userId } = action;
    state.bookings.find(
      (book) => book.event_id === eventId && book.user._id === userId
    );
  },
  fetchBookings: (state, action) => {
    state.bookings = action.payload;
  },
  deleteBooking: (state, action) => {
    state.loading = false;
    state.bookings = state.bookings.filter(
      (book) => book.event._id !== action.payload
    );
  },
  getError: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.loading = false;
    state.error = null;
  },
};

export default reducers;
