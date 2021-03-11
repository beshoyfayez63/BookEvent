import { memo } from 'react';
import { FaEye } from 'react-icons/fa';

import './EventItem.css';

function EventItem(props) {
  return (
    <li className='event__list-item'>
      <div>
        <h1>{props.title}</h1>
        <h2>
          ${props.price} - {new Date(props.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {props.userId === props.creatorId ? (
          <p>You are the owner of this event.</p>
        ) : (
          <button className='btn' onClick={() => props.onDetail(props.eventId)}>
            <FaEye />
          </button>
        )}
      </div>
    </li>
  );
}

export default memo(EventItem);
