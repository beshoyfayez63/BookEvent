import BookingItem from './BookingItem';

import './BookingList.css';

function BookingList(props) {
  return (
    <ul className='booking__list'>
      {props.bookings.length > 0 &&
        props.bookings.map((book) => (
          <BookingItem
            key={book._id}
            eventTitle={book.event.title}
            createdAt={book.createdAt}
            bookId={book._id}
            onDelete={props.cancelBooking}
          />
        ))}
    </ul>
  );
}

export default BookingList;
