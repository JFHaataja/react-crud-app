import 'assets/App.scss';
import { useState } from 'react';
import md5 from 'md5';
import LoginService from 'api/Auth';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Form from 'react-bootstrap/Form';
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup';
import FormGroupPassword from 'components/elements/Form/FormGroup/FormGroup/FormGroupPassword';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'components/elements/Spinner/Spinner';
import LogIn from 'assets/Icon/LogIn';
import Cart from 'assets/Icon/Cart';

const Login = ({ setIsPositive, setMessage, setShowMessage, setLoggedInUser, setAdminUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Login');

    const handleSubmit = (event) => {
        event.preventDefault();
        const userForAuth = {
            username: username,
            password: md5(password),
        };
        setButtonText(<Spinner spinnerSize={'sm'} spinnerVariant="dark" />);

        LoginService.authenticate(userForAuth)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('accesslevelId', response.data.accesslevelId);
                    localStorage.setItem('token', response.data.token);

                    setLoggedInUser(response.data.username);

                    if (response.data.accesslevelId === 1) {
                        setAdminUser(response.data.accesslevelId);
                    } else {
                        setAdminUser(null);
                    }
                    setMessage(`Logged in as: ${userForAuth.username}`);
                    setIsPositive(true);
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 5000);
                }
            })
            .catch((error) => {
                setMessage(error);
                setIsPositive(false);
                setShowMessage(true);

                setTimeout(() => {
                    setShowMessage(false);
                }, 6000);
            });
    };

    const emptyFields = () => {
        setUsername('');
        setPassword('');
    };

    return (
        <Container fluid>
            <Row>
                <Col md={7} className="overflow-hidden"></Col>
                <Col className="vh-100 d-flex justify-content-center bg-white shadow-lg overflow-hidden">
                    <Form
                        onSubmit={handleSubmit}
                        className="text-start d-flex flex-column justify-content-center"
                    >
                        <p className="fs-6 fw-bold text-primary mb-0 pb-0">
                            NW TRADERS <Cart />
                        </p>
                        <h1 className="fs-2">Welcome!</h1>
                        <p>Please Log in to check out my demo app.</p>

                        <FormGroup
                            formLabelText="Username"
                            inputType="text"
                            inputValue={username}
                            inputPlaceholder="First Name"
                            onChangeHandler={({ target }) => setUsername(target.value)}
                            requiredOrNot={true}
                        />

                        <FormGroupPassword
                            passwordType="password"
                            passwordValue={password}
                            passwordPlaceholder="Password"
                            onChangeHandler={({ target }) => setPassword(target.value)}
                            requiredOrNot={true}
                            dataCy="passwordLogin"
                            formControlId={'passwordLogin'}
                        />

                        <Form.Group>
                            <Button
                                btnVariant="outline-primary"
                                clickHandler={() => emptyFields()}
                                buttonText="Clear"
                            />
                            <Button
                                btnVariant="primary"
                                btnType="submit"
                                buttonText={buttonText}
                                clickHandler={() => setButtonText()}
                                endIcon={<LogIn />}
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
