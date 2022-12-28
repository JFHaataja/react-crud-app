import 'assets/App.scss'
import Form from 'react-bootstrap/Form'

export default function InputGroup({controlId, inputType, inputPlaceholder, labelText, inputAs, inputRows}) {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{labelText}</Form.Label>
            <Form.Control type={inputType} placeholder={inputPlaceholder} as={inputAs} rows={inputRows} />
        </Form.Group>
    )
  }