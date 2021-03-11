import { Fragment, useState, useEffect, useCallback } from 'react';

import EventList from '../components/Events/EventList';
import EventControls from '../components/Events/EventControls';
import CreateEvent from '../components/Events/CreateEvent';
import EventDetail from '../components/Events/EventDetail';
import Spinner from '../components/UI/Spinner';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { eventFetch, eventById } from '../store/event/event-slice';
import { eventsQuery } from '../util/graphql-queries';

import './Events.css';

function Events() {
  console.log('Events');
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(null);

  const token = useSelector((state) => state.user.userData.token);
  const userId = useSelector((state) => state.user.userData.userId);
  const events = useSelector((state) => state.event.events);
  const loading = useSelector((state) => state.event.loading);

  const dispatch = useDispatch();
  const fetchEvents = useCallback((data) => dispatch(eventFetch(data)), [
    dispatch,
  ]);

  useEffect(() => {
    fetchEvents(eventsQuery);
  }, [fetchEvents]);

  useEffect(() => {
    if (!token) {
      setOpen(false);
    }
  }, [token]);

  const openModal = () => setOpen(true);

  const closeModal = () => {
    setOpen(false);
  };

  const closeEventDetailModal = () => {
    setEvent(null);
  };

  const showDetail = (eventId) => {
    const event = events.find((event) => event._id === eventId);
    setEvent(event);
  };

  return (
    <Fragment>
      <CreateEvent open={open} closeModal={closeModal} userId={userId} />
      {token && <EventControls openModal={openModal} />}
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <EventList
            events={events}
            userId={userId}
            onViewDetail={showDetail}
          />

          <EventDetail
            event={event}
            closeModal={closeEventDetailModal}
            confirmModal={() => {}}
            open={Boolean(event)}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Events;
