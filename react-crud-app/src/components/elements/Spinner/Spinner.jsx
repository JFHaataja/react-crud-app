import 'assets/App.scss'
import Spinner from 'react-bootstrap/Spinner'

function SpinnerPrimary({spinnerSize, spinnerVariant}) {
  return (
    <Spinner
    variant={spinnerVariant}
    animation="border"
    role="status"
    as="span"
    size={spinnerSize}
    aria-hidden="true"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default SpinnerPrimary