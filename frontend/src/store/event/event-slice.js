import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    loading: false,
    events: [],
    event: {},
    error: null,
  },
  reducers: {},
});

// export const {} = eventSlice.actions;

// EXPORT AND MAKE ASYNC FUNCTIONS

// EXPORT ALL STATES
export const loading = (state) => state.event.loading;
export const events = (state) => state.event.events;
export const event = (state) => state.event.event;
export const error = (state) => state.event.error;

export default eventSlice.reducer;
