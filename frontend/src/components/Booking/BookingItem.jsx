import React from 'react';

function Bookingitem(props) {
  return (
    <li className='booking__item'>
      <div className='booking__item-data'>
        {props.eventTitle} - {new Date(props.createdAt).toLocaleDateString()}
      </div>
      <div className='booking__item-actions'>
        <button className='btn' onClick={() => props.onDelete(props.bookId)}>
          Cancel
        </button>
      </div>
    </li>
  );
}

export default Bookingitem;
