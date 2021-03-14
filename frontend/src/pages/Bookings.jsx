import { Fragment, useEffect, useCallback } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBookinngsAsync,
  deleteBookingAsync,
} from '../store/booking/book-slice';

import {
  fetchBookingsQuery,
  cancelBookingQuery,
} from '../util/graphql-queries';

// COMPONENTS
import Spinner from '../components/UI/Spinner';
import BookingList from '../components/Booking/BookingList';

function Bookings() {
  const dispatch = useDispatch();

  const loadingBookings = useSelector((state) => state.book.loading);
  const bookings = useSelector((state) => state.book.bookings);

  const fetchBookings = useCallback(
    () => dispatch(fetchBookinngsAsync(fetchBookingsQuery())),
    [dispatch]
  );
  const cancelBookingFunc = (data) => dispatch(deleteBookingAsync(data));

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const cancelBookingHandler = (bookId) => {
    console.log(bookId);
    const query = cancelBookingQuery(bookId);
    cancelBookingFunc(query);
  };

  return (
    <Fragment>
      {loadingBookings && <Spinner />}
      {bookings.length > 0 && (
        <BookingList bookings={bookings} cancelBooking={cancelBookingHandler} />
      )}
    </Fragment>
  );
}

export default Bookings;
