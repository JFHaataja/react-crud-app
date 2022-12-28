import Button from 'react-bootstrap/Button'
import 'assets/App.scss'

function PrimaryButton({buttonText, clickHandler, btnVariant, btnType, startIcon, endIcon}) {
    return (
        <Button variant={btnVariant} type={btnType} className="me-2 rounded-pill py-2 px-3 my-2 my-md-0" onClick={clickHandler}>
            {startIcon}
            {buttonText}
            {endIcon}
        </Button>
    )
}

  export default PrimaryButton