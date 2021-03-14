import LoadingSpinner from './spinner-css';
import './Spinner.css';

function Spinner(props) {
  return (
    <div className='spinner-content'>
      {/* <div className='lds-dual-ring'></div> */}
      <LoadingSpinner
        width={props.width}
        height={props.height}
        afterWidth={props.afterWidth}
        afterHeight={props.afterHeight}
        margin={props.margin}
      />
    </div>
  );
}

export default Spinner;
