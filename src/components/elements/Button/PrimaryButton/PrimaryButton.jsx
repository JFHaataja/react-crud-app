import Button from 'react-bootstrap/Button';
import 'assets/App.scss';

function PrimaryButton({
    buttonText,
    clickHandler,
    btnVariant,
    btnType,
    startIcon,
    endIcon,
    buttonId,
    dataCy,
    ariaLabel,
}) {
    return (
        <Button
            variant={btnVariant}
            type={btnType}
            className="me-2 rounded-pill py-2 px-3 my-2 my-md-0"
            onClick={clickHandler}
            id={buttonId}
            data-cy={dataCy}
            aria-label={ariaLabel}
        >
            {startIcon}
            {buttonText}
            {endIcon}
        </Button>
    );
}

export default PrimaryButton;
