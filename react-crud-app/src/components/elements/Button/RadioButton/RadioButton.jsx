import Form from 'react-bootstrap/Form'
import 'assets/App.scss'

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

export default RadioButton;