import { memo } from 'react';

function EventControls(props) {
  return (
    <div className='event-controls'>
      <p>Share your own events.</p>
      <button className='btn' onClick={props.openModal}>
        Create Event
      </button>
    </div>
  );
}

export default memo(EventControls);
