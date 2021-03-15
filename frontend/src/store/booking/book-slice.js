import { createSlice } from '@reduxjs/toolkit';
import reducers from './booking-reducer';

import axios from '../../util/axios';

import { getDataLocalStorage } from '../../util/helper';

const bookSlice = createSlice({
  name: 'event',
  initialState: {
    loading: false,
    bookings: [],
    error: false,
  },
  reducers: reducers,
});

export const {
  loadBooking,
  createBooking,
  fetchBookings,
  deleteBooking,
  isBooked,
  getError,
  clearError,
} = bookSlice.actions;

export const bookEventAsync = (data, cb) => {
  return async (dispatch) => {
    try {
      dispatch(loadBooking());
      const result = await axios({
        method: 'POST',
        url: '/',
        data,
        headers: {
          Authorization: `Bearer ${getDataLocalStorage().token}`,
        },
      });
      console.log(result);
      dispatch(createBooking(result.data.data.bookEvent));
      cb();
    } catch (err) {
      console.log(err.response);
      dispatch(getError(err.response));
    }
  };
};

export const fetchBookinngsAsync = (query) => async (dispatch) => {
  try {
    dispatch(loadBooking());
    const bookings = await axios.post('/', query, {
      headers: {
        Authorization: `Bearer ${getDataLocalStorage().token}`,
      },
    });
    console.log(bookings);
    dispatch(fetchBookings(bookings.data.data.bookings));
    dispatch(clearError());
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteBookingAsync = (data) => async (dispatch) => {
  try {
    dispatch(loadBooking());
    const result = await axios.post('/', data, {
      headers: {
        Authorization: `Bearer ${getDataLocalStorage().token}`,
      },
    });
    console.log(result);
    dispatch(deleteBooking(result.data.data.cancelBooking._id));
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
};

export default bookSlice.reducer;
