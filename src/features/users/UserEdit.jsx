import 'assets/App.scss';
import { useState } from 'react';
import UserService from 'api/User';
import md5 from 'md5';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowLeft from 'assets/Icon/ArrowLeft';

const UserEdit = ({ setEditMode, setIsPositive, setMessage, setShowMessage, userForEdit }) => {
  const [newUserId] = useState(userForEdit.userId);
  const [newUsername, setNewUsername] = useState(userForEdit.username);
  const [newPassword] = useState(userForEdit.password);
  const [newFirstname, setNewFirstname] = useState(userForEdit.firstname);
  const [newLastname, setNewLastname] = useState(userForEdit.lastname);
  const [newEmail, setNewEmail] = useState(userForEdit.email);
  const [newAccesslevelId, setNewAccesslevelId] = useState(userForEdit.accesslevelId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      userId: parseInt(newUserId),
      username: newUsername.toString(),
      password: md5(newPassword),
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail.toString(),
      accesslevelId: parseInt(newAccesslevelId),
    };

    UserService.update(newUser)
      .then((response) => {
        if (response.status === 200) {
          setMessage('Edited User: ' + newUser.username);
          setIsPositive(true);
          setShowMessage(true);
          window.scrollBy(0, -10000);
          setTimeout(() => {
            setShowMessage(false);
          }, 5000);
          setEditMode(false);
        }
      })
      .catch((error) => {
        setMessage(error);
        setIsPositive(false);
        setShowMessage(true);
        window.scrollBy(0, -10000);
        setTimeout(() => {
          setShowMessage(false);
        }, 6000);
      });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-white mb-3">Edit User</h2>
      <Button
        btnVariant="outline-primary"
        btnType="button"
        buttonText="Go Back"
        value="back"
        clickHandler={() => setEditMode(false)}
        startIcon={<ArrowLeft />}
      />
      <Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
        <Row>
          <Col className="mx-0 mx-lg-5 px-0 px-lg-5">
            <FormGroup formLabelText={'User ID'} inputType="text" inputValue={newUserId} disabled />
            <FormGroup
              formLabelText="Username"
              inputType="text"
              inputValue={newUsername}
              inputPlaceholder="Username"
              onChangeHandler={({ target }) => setNewUsername(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText="First Name"
              inputType="text"
              inputValue={newFirstname}
              inputPlaceholder="First Name"
              onChangeHandler={({ target }) => setNewFirstname(target.value)}
              requiredOrNot={true}
            />

            <FormGroup
              formLabelText="Last Name"
              inputType="text"
              inputValue={newLastname}
              inputPlaceholder="Last Name"
              onChangeHandler={({ target }) => setNewLastname(target.value)}
              requiredOrNot={true}
            />
            <FormGroup
              formLabelText="Email"
              inputType="email"
              inputValue={newEmail}
              inputPlaceholder="Email"
              onChangeHandler={({ target }) => setNewEmail(target.value)}
              requiredOrNot={false}
            />
            <FormGroup
              formLabelText="Access Level (1=admin, 2=basic user)"
              inputType="text"
              inputValue={newAccesslevelId}
              inputPlaceholder="Access Level ID (1=admin, 2=basic user)"
              onChangeHandler={({ target }) => setNewAccesslevelId(target.value)}
              requiredOrNot={true}
            />
            <div className="d-flex mt-5 justify-content-end">
              <Button btnVariant="primary" btnType="submit" buttonText="Confirm and Save" />
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserEdit;
