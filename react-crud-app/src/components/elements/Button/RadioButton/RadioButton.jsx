import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';


function RadioButton({checkedOrNot, handleChange, radioButtonLabel, radioButtonValue}) {
  return (
      <Form.Check 
        type="radio"
        name="radioButton"
        onChange={handleChange}
        checked={checkedOrNot}
        label={radioButtonLabel}
        value={radioButtonValue}
        />
  )
}

RadioButton.propTypes = {
    checkedOrNot: PropTypes.bool,
    handleChange: PropTypes.func,
    radioButtonLabel: PropTypes.string,
    radioButtonValue: PropTypes.string 
  };

export default RadioButton;