import { Fragment, useCallback, memo } from 'react';

import BackDrop from '../UI/BackDrop';
import Modal from '../UI/Modal';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventSchema } from '../../util/validation';

import { useDispatch } from 'react-redux';
import { createEventAsync } from '../../store/event/event-slice';
import { createEventQuery } from '../../util/graphql-queries';

function CreateEvent(props) {
  console.log('Create');
  const {
    handleSubmit,
    register,
    errors,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(eventSchema),
  });

  const dispatch = useDispatch();
  const createEvent = useCallback(
    (data, userId, cb) => dispatch(createEventAsync(data, userId, cb)),
    [dispatch]
  );

  const handleEventSubmit = (data) => {
    const eventData = { ...data, date: data.date.toISOString() };
    console.log(eventData);
    const resultData = createEventQuery(eventData);
    createEvent(resultData, props.userId, props.closeModal);
  };

  return (
    <Fragment>
      {props.open && <BackDrop onClick={props.closeModal} />}
      <Modal
        title='Create Event'
        canCancel
        canConfirm
        closeModal={props.closeModal}
        onConfirm={handleSubmit(handleEventSubmit)}
        isValid={isValid}
        confirmText='Create'
        open={props.open}
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
    </Fragment>
  );
}

export default memo(CreateEvent, (prev, next) => {
  return prev.open === next.open;
});
