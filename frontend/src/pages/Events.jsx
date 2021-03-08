import { Fragment, useState, useEffect } from 'react';

import Modal from '../components/UI/Modal';
import BackDrop from '../components/UI/BackDrop';

// FORM
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventSchema } from '../util/validation';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { createEventAsync, eventFetch } from '../store/event/event-slice';
import './Events.css';

function Events() {
  const [open, setOpen] = useState(false);

  const token = useSelector((state) => state.user.userData.token);
  const events = useSelector((state) => state.event.events);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(eventSchema),
  });

  const dispatch = useDispatch();
  const createEvent = (data) => dispatch(createEventAsync(data));

  useEffect(() => {
    const data = {
      query: `
        query {
          events {
            _id
            title
            price
            date
            creator {
              _id
            }
          }
        }
      `,
    };
    dispatch(eventFetch(data));
  }, [dispatch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setOpen(false);
    }
  }, [isSubmitSuccessful]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleEventSubmit = (data) => {
    const eventData = { ...data, date: data.date.toISOString() };
    console.log(eventData);
    const resultData = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${eventData.title}",
          description: "${eventData.description}", 
          price: ${eventData.price}, 
          date: "${eventData.date}"}) {
          _id
          title
          description
          price
          date
          }
        }
      `,
    };
    createEvent(resultData);
  };

  return (
    <Fragment>
      {open && <BackDrop onClick={closeModal} />}
      <Modal
        title='Create Event'
        canCancel
        canConfirm
        closeModal={closeModal}
        onConfirm={handleSubmit(handleEventSubmit)}
        isValid={isValid}
        open={open}
      >
        <form>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' ref={register} />
            {errors && errors.title && (
              <p className='error-message'>{errors.title.message}</p>
            )}
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea
              rows='4'
              name='description'
              id='description'
              ref={register}
            ></textarea>
            {errors && errors.description && (
              <p className='error-message'>{errors.description.message}</p>
            )}
          </div>
          <div className='form-control'>
            <label htmlFor='price'>Price</label>
            <input type='number' name='price' ref={register} />
            {errors && errors.price && (
              <p className='error-message'>{errors.price.message}</p>
            )}
          </div>
          <div className='form-control'>
            <label htmlFor='date'>Date</label>
            <input type='datetime-local' name='date' ref={register} />
            {errors && errors.date && (
              <p className='error-message'>{errors.date.message}</p>
            )}
          </div>
        </form>
      </Modal>
      {token && (
        <div className='event-controls'>
          <p>Share your own events.</p>
          <button className='btn' onClick={openModal}>
            Create Event
          </button>
        </div>
      )}
      <ul className='events__list'>
        {events.length > 0 &&
          events.map((event) => (
            <li className='events__list-item' key={event._id}>
              {event.title}
            </li>
          ))}
      </ul>
    </Fragment>
  );
}

export default Events;
