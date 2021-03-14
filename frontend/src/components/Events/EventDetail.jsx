import { Fragment, useEffect, useState } from 'react';
import axios from '../../util/axios';

import Modal from '../UI/Modal';
import BackDrop from '../UI/BackDrop';

import { useSelector } from 'react-redux';

import { isEventBooked } from '../../util/graphql-queries';

function EventDetail(props) {
  const [eventisBooked, setEventIsBooked] = useState(false);

  const token = useSelector((state) => state.user.userData.token);

  useEffect(() => {
    if (token && props.event?._id) {
      const isBooked = async () => {
        try {
          const result = await axios.post(
            '/',
            isEventBooked(props.event?._id),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(result);
          setEventIsBooked(result.data.data.isEventBooked);
        } catch (err) {
          console.log(err.response);
        }
      };
      isBooked();
    }
  }, [token, props.event?._id]);
  return (
    <Fragment>
      {props.open && <BackDrop onClick={props.closeModal} />}

      <Modal
        title={props.event?.title}
        canCancel
        closeModal={props.closeModal}
        onRequest={props.bookEvent}
        confirmText={eventisBooked ? 'Booked' : 'Book Now'}
        isBooked={eventisBooked}
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
