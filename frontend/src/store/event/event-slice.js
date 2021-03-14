import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getDataLocalStorage } from '../../util/helper';
import { reducers } from './event-reducers';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    loading: false,
    events: [],
    event: null,
    error: null,
  },
  reducers: reducers,
});

export const {
  createEvent,
  fetchEvents,
  loadEvent,
  clearError,
  getError,
} = eventSlice.actions;

// EXPORT AND MAKE ASYNC FUNCTIONS
export const createEventAsync = (data, userId, cb) => async (dispatch) => {
  console.log(userId);
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
    // result.data.data.createEvent
    dispatch(createEvent({ event: result.data.data.createEvent, userId }));
    dispatch(clearError());
    cb();
  } catch (err) {
    if (err) {
      console.log(err.message);
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
