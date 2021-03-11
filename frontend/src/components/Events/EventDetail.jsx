import { Fragment } from 'react';

import Modal from '../UI/Modal';
import BackDrop from '../UI/BackDrop';

function EventDetail(props) {
  console.log('Event Detail');
  return (
    <Fragment>
      {props.open && <BackDrop onClick={props.closeModal} />}

      <Modal
        title={props.event?.title}
        canCancel
        canConfirm
        closeModal={props.closeModal}
        confirmModal={props.bookEvent}
        confirmText='Book'
        isValid={true}
        open={props.open}
      >
        <h1>{props.event?.title}</h1>
        <h2>
          ${props.event?.price} -{' '}
          {new Date(props.event?.date).toLocaleDateString()}
        </h2>
        <p>{props.event?.description}</p>
      </Modal>
    </Fragment>
  );
}

export default EventDetail;
