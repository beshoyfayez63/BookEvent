import { memo } from 'react';
import EventItem from './EventItem';

import './EventList.css';

function EventList(props) {
  return (
    <ul className='event__list'>
      {props.events.length > 0 &&
        props.events.map((event) => (
          <EventItem
            eventId={event._id}
            key={event._id}
            title={event.title}
            price={event.price}
            date={event.date}
            userId={props.userId}
            creatorId={event.creator._id}
            onDetail={props.onViewDetail}
          />
        ))}
    </ul>
  );
}

export default memo(EventList);
