import 'assets/App.scss'
import Form from 'react-bootstrap/Form'

export default function PasswordInputGroup({passwordType, passwordErrorMsg, passwordValue, passwordPlaceholder, onChangeHandler}) {
    return (
        <>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type={passwordType} value={passwordValue} placeholder={passwordPlaceholder} onChange={onChangeHandler}/>
            <Form.Control.Feedback>
            {passwordErrorMsg}
            </Form.Control.Feedback>
        </Form.Group>
        </>
    )
  }