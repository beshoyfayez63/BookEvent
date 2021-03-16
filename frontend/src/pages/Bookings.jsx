import { Fragment, useState, useEffect, useCallback } from 'react';

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
import Chart from '../components/Booking/Chart';
import BookingsControls from '../components/Booking/BookingControls';

function Bookings() {
  const [outputType, setOutputType] = useState('list');
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

  const outputTypeHandler = (output) => {
    if (output === 'list') setOutputType('list');
    else setOutputType('chart');
  };

  let content = <Spinner />;
  if (!loadingBookings) {
    content = (
      <Fragment>
        <BookingsControls
          outputHandler={outputTypeHandler}
          activeClass={outputType}
        />
        {outputType === 'list' ? (
          <BookingList
            bookings={bookings}
            cancelBooking={cancelBookingHandler}
          />
        ) : (
          <Chart bookings={bookings} />
        )}
      </Fragment>
    );
  }

  // <BookingList bookings={bookings} cancelBooking={cancelBookingHandler} />
  return content;
}

export default Bookings;
