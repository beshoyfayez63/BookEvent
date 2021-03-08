import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getDataLocalStorage } from '../../util/helper';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    loading: false,
    events: [],
    event: {},
    error: null,
  },
  reducers: {
    loadEvent: (state) => {
      state.loading = true;
    },
    createEvent: (state, action) => {
      state.events.unshift(action.payload);
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
  },
});

// export const {} = eventSlice.actions;
export const {
  createEvent,
  fetchEvents,
  loadEvent,
  clearError,
  getError,
} = eventSlice.actions;

// EXPORT AND MAKE ASYNC FUNCTIONS
export const createEventAsync = (data) => async (dispatch) => {
  try {
    dispatch(loadEvent());
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      data,
      headers: {
        Authorization: `Bearer ${getDataLocalStorage().token}`,
      },
    });
    console.log(result);
    if (result.data.errors && result.data.errors.length > 0) {
      const message = result.data.errors[0].message;
      throw new Error(message);
    }
    dispatch(createEvent(result.data.data.createEvent));
    dispatch(clearError());
  } catch (err) {
    if (err) {
      console.log(typeof err.message);
      dispatch(getError(err.message));
    }
  }
};

export const eventFetch = (data) => async (dispatch) => {
  try {
    dispatch(loadEvent());
    const events = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      data,
    });
    console.log(events);
    dispatch(fetchEvents(events.data.data.events));
    dispatch(clearError());
  } catch (err) {
    console.log(err.response);
  }
};

// EXPORT ALL STATES
export const loading = (state) => state.event.loading;
export const events = (state) => state.event.events;
export const event = (state) => state.event.event;
export const error = (state) => state.event.error;

export default eventSlice.reducer;
