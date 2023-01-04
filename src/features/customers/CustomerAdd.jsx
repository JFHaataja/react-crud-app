import 'assets/App.scss';
import { useState } from 'react';
import CustomerService from 'api/Customer';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowLeft from 'assets/Icon/ArrowLeft';

const CustomerAdd = ({ setAddNewMode, setIsPositive, setMessage, setShowMessage }) => {
    // Komponentin tilan määritys

    const [newcustomerID, setNewcustomerID] = useState('');
    const [newCompanyName, setNewCompanyName] = useState('');
    const [newContactName, setNewContactName] = useState('');
    const [newContactTitle, setNewContactTitle] = useState('');

    const [newCountry, setNewCountry] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newRegion, setNewRegion] = useState('');

    const [newPostalCode, setNewPostalCode] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newFax, setNewFax] = useState('');

    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
        event.preventDefault();
        const newCustomer = {
            customerID: newcustomerID.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax,
        };

        if (newCustomer.customerID !== '') {
            CustomerService.create(newCustomer)
                .then((response) => {
                    if (response.status === 200) {
                        setMessage('Added new Customer: ' + newCustomer.companyName);
                        setIsPositive(true);
                        setShowMessage(true);
                        window.scrollBy(0, -10000); // Scrollataan ylös jotta nähdään alert
                        setTimeout(() => {
                            setShowMessage(false);
                        }, 5000);
                        setAddNewMode(false);
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
        } else {
            setMessage('Customer ID can not be empty.');
            setIsPositive(false);
            setShowMessage(true);
            window.scrollBy(0, -10000);
            setTimeout(() => {
                setShowMessage(false);
            }, 7000);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-white mb-3">Add New Customer</h2>
            <Button
                btnVariant="outline-primary"
                btnType="button"
                buttonText="Go Back"
                clickHandler={() => setAddNewMode(false)}
                startIcon={<ArrowLeft />}
            />
            <Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3 mb-5">
                <Row>
                    <Col sm={12} md={4}>
                        <FormGroup
                            formLabelText={'Customer ID'}
                            inputType="text"
                            inputValue={newcustomerID}
                            inputPlaceholder="ID with 5 capital letters"
                            inputMaxLength={'5'}
                            inputMinLength={'5'}
                            onChangeHandler={({ target }) => setNewcustomerID(target.value)}
                            requiredOrNot={true}
                        />
                        <FormGroup
                            formLabelText={'Company Name'}
                            inputType="text"
                            inputValue={newCompanyName}
                            inputPlaceholder="Company Name"
                            onChangeHandler={({ target }) => setNewCompanyName(target.value)}
                            requiredOrNot={true}
                        />
                        <FormGroup
                            formLabelText={'Contact Name'}
                            inputType="text"
                            inputValue={newContactName}
                            inputPlaceholder="Contact Name"
                            onChangeHandler={({ target }) => setNewContactName(target.value)}
                            requiredOrNot={true}
                        />
                        <FormGroup
                            formLabelText={'Contact Title'}
                            inputType="text"
                            inputValue={newContactTitle}
                            inputPlaceholder="Contact Title"
                            onChangeHandler={({ target }) => setNewContactTitle(target.value)}
                            requiredOrNot={true}
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <FormGroup
                            formLabelText={'Country'}
                            inputType="text"
                            inputValue={newCountry}
                            inputPlaceholder="Country"
                            onChangeHandler={({ target }) => setNewCountry(target.value)}
                            requiredOrNot={true}
                        />
                        <FormGroup
                            formLabelText={'Address'}
                            inputType="text"
                            inputValue={newAddress}
                            inputPlaceholder="Address"
                            onChangeHandler={({ target }) => setNewAddress(target.value)}
                            requiredOrNot={true}
                        />
                        <FormGroup
                            formLabelText={'City'}
                            inputType="text"
                            inputValue={newCity}
                            inputPlaceholder="City"
                            onChangeHandler={({ target }) => setNewCity(target.value)}
                            requiredOrNot={true}
                        />
                        <FormGroup
                            formLabelText={'Region'}
                            inputType="text"
                            inputValue={newRegion}
                            inputPlaceholder="Region"
                            onChangeHandler={({ target }) => setNewRegion(target.value)}
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <FormGroup
                            formLabelText={'Postal Code'}
                            inputType="text"
                            inputValue={newPostalCode}
                            inputPlaceholder="Postal Code"
                            onChangeHandler={({ target }) => setNewPostalCode(target.value)}
                            requiredOrNot={true}
                        />
                        <FormGroup
                            formLabelText={'Phone'}
                            inputType="text"
                            inputValue={newPhone}
                            inputPlaceholder="Phone Number"
                            onChangeHandler={({ target }) => setNewPhone(target.value)}
                        />
                        <FormGroup
                            formLabelText={'Fax'}
                            inputType="text"
                            inputValue={newFax}
                            inputPlaceholder="Fax Number"
                            onChangeHandler={({ target }) => setNewFax(target.value)}
                        />
                        <div className="d-flex mt-5 justify-content-end">
                            <Button
                                btnVariant={'primary'}
                                btnType="submit"
                                buttonText="Confirm and Save"
                            />
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default CustomerAdd;
