import './BookingControls.css';

function BookingsControls(props) {
  return (
    <div className='booking-controls'>
      <button
        className={props.activeClass === 'list' ? 'active' : ''}
        onClick={() => props.outputHandler('list')}
      >
        List
      </button>
      <button
        className={props.activeClass === 'chart' ? 'active' : ''}
        onClick={() => props.outputHandler('chart')}
      >
        Chart
      </button>
    </div>
  );
}

export default BookingsControls;
