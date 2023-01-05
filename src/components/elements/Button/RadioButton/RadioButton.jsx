import Form from 'react-bootstrap/Form';

function RadioButton({rBLabel, rBId, rBName, onChangeHandler, defaultValue, checkedOrNot, requiredOrNot}) {
  return (
    <>
            <Form.Check
            inline
            label={rBLabel}
            type="radio"
            checked={checkedOrNot}
            id={rBId}
            name={rBName}
            onChange={onChangeHandler}
            defaultValue={defaultValue}
            required={requiredOrNot}
          />
    </>
  )
}

export default RadioButton