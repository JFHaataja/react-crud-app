import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/* Return PrimaryButton */
function PrimaryButton({buttonText, clickHandler, btnVariant, btnType, startIcon, endIcon}) {
    return (
        <Button variant={btnVariant} type={btnType} className="me-2 rounded-pill py-2 px-3 my-2 my-md-0" onClick={clickHandler}>
            {startIcon}
            {buttonText}
            {endIcon}
        </Button>
    )
};
    PrimaryButton.propTypes = {
        buttonText: PropTypes.string.isRequired,
        clickHandler: PropTypes.func,
        btnVariant: PropTypes.string.isRequired,
        btnType: PropTypes.string,
        startIcon: PropTypes.object,
        endIcon: PropTypes.object    
      };

  export default PrimaryButton;