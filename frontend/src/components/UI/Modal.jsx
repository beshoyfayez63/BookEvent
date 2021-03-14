import { memo } from 'react';

import { CSSTransition } from 'react-transition-group';

import './Modal.css';

function Modal(props) {
  return (
    <CSSTransition
      in={props.open}
      timeout={200}
      classNames='modal-animate'
      mountOnEnter
      unmountOnExit
    >
      <div className='modal'>
        <header className='modal__header'>
          <h1>{props.title}</h1>
        </header>
        <section className='modal__content'>{props.children}</section>
        <section className='modal__actions'>
          {props.canCancel && (
            <button
              className='btn u-margin-right-small'
              onClick={props.closeModal}
            >
              Cancel
            </button>
          )}
          {props.canConfirm && (
            <button
              className='btn'
              onClick={props.onConfirm}
              disabled={!props.isValid}
            >
              {props.confirmText}
            </button>
          )}
          {!props.canConfirm && (
            <button
              className='btn'
              onClick={props.onRequest}
              disabled={props.isBooked}
            >
              {props.confirmText}
            </button>
          )}
        </section>
      </div>
    </CSSTransition>
  );
}

export default memo(Modal);
