import 'assets/App.scss'
import Form from 'react-bootstrap/Form';

function FormGroup({formLabelText, inputValue, inputType, inputPlaceholder, inputMaxLength, inputMinLength, onChangeHandler}) {
    
    return (
      <>
        <Form.Group className="mb-3">
            <Form.Label>{formLabelText}</Form.Label>
            <Form.Control type={inputType} defaultValue={inputValue} placeholder={inputPlaceholder} maxLength={inputMaxLength} minLength={inputMinLength} onChange={onChangeHandler} />
        </Form.Group>
      </>
    )
  }
  
  export default FormGroup;