import 'assets/App.scss';
import Form from 'react-bootstrap/Form';

export default function PasswordInputGroup({
    passwordType,
    passwordValue,
    passwordPlaceholder,
    onChangeHandler,
    requiredOrNot,
    formControlId,
    dataCy,
    formLabelText,
    formGroupControlId,
}) {
    return (
        <>
            <Form.Group className="mb-3" controlId={formGroupControlId}>
                <Form.Label>{formLabelText}</Form.Label>
                <Form.Control
                    type={passwordType}
                    value={passwordValue}
                    placeholder={passwordPlaceholder}
                    onChange={onChangeHandler}
                    required={requiredOrNot}
                    id={formControlId}
                    data-cy={dataCy}
                    className="rounded-20"
                />
            </Form.Group>
        </>
    );
}
