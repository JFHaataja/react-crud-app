import 'assets/App.scss';
import { useState } from 'react';
import CustomerService from 'api/Customer';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'components/elements/Form/FormGroup/FormGroup';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowLeft from 'assets/Icon/ArrowLeft';

const CustomerEdit = ({
    setEditMode,
    setPositiveMessage,
    setMessage,
    setShowMessage,
    customerForEdit,
}) => {
    const [newcustomerID] = useState(customerForEdit.customerID);
    const [newCompanyName, setNewCompanyName] = useState(customerForEdit.companyName);
    const [newContactName, setNewContactName] = useState(customerForEdit.contactName);
    const [newContactTitle, setNewContactTitle] = useState(customerForEdit.contactTitle);

    const [newCountry, setNewCountry] = useState(customerForEdit.country);
    const [newAddress, setNewAddress] = useState(customerForEdit.address);
    const [newCity, setNewCity] = useState(customerForEdit.city);
    const [newRegion, setNewRegion] = useState(customerForEdit.region);

    const [newPostalCode, setNewPostalCode] = useState(customerForEdit.postalCode);
    const [newPhone, setNewPhone] = useState(customerForEdit.phone);
    const [newFax, setNewFax] = useState(customerForEdit.fax);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCustomer = {
            customerID: newcustomerID,
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

        CustomerService.update(newCustomer)
            .then((response) => {
                if (response.status === 200) {
                    setMessage('Edited Customer: ' + newCustomer.companyName);
                    setPositiveMessage(true);
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
                setPositiveMessage(false);
                setShowMessage(true);
                window.scrollBy(0, -10000);
                setTimeout(() => {
                    setShowMessage(false);
                }, 6000);
            });
    };

    return (
        <Container className="mt-4">
            <h2 className="text-white mb-3">Edit Customer</h2>
            <Button
                btnVariant="outline-primary"
                btnType="button"
                buttonText="Go Back"
                clickHandler={() => setEditMode(false)}
                startIcon={<ArrowLeft />}
            />
            <Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
                <Row>
                    <Col>
                        <FormGroup
                            formLabelText="Customer ID"
                            inputType="text"
                            inputValue={newcustomerID}
                            inputPlaceholder="ID with 5 capital letters"
                            inputMaxLength={'5'}
                            inputMinLength={'5'}
                            formGroupControlId="CustomerID"
                            disabled
                        />
                        <FormGroup
                            formLabelText="Company Name"
                            inputType="text"
                            inputValue={newCompanyName}
                            inputPlaceholder="Company Name"
                            onChangeHandler={({ target }) => setNewCompanyName(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="CompanyName"
                        />
                        <FormGroup
                            formLabelText="Contact Name"
                            inputType="text"
                            inputValue={newContactName}
                            inputPlaceholder="Contact Name"
                            onChangeHandler={({ target }) => setNewContactName(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="ContactName"
                        />
                        <FormGroup
                            formLabelText="Contact Title"
                            inputType="text"
                            inputValue={newContactTitle}
                            inputPlaceholder="Contact Title"
                            onChangeHandler={({ target }) => setNewContactTitle(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="ContactTitle"
                        />
                        <FormGroup
                            formLabelText="Country"
                            inputType="text"
                            inputValue={newCountry}
                            inputPlaceholder="Country"
                            onChangeHandler={({ target }) => setNewCountry(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="Country"
                        />
                        <FormGroup
                            formLabelText="Address"
                            inputType="text"
                            inputValue={newAddress}
                            inputPlaceholder="Address"
                            onChangeHandler={({ target }) => setNewAddress(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="Address"
                        />
                    </Col>
                    <Col>
                        <FormGroup
                            formLabelText="City"
                            inputType="text"
                            inputValue={newCity}
                            inputPlaceholder="City"
                            onChangeHandler={({ target }) => setNewCity(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="City"
                        />
                        <FormGroup
                            formLabelText="Region"
                            inputType="text"
                            inputValue={newRegion}
                            inputPlaceholder="Region"
                            onChangeHandler={({ target }) => setNewRegion(target.value)}
                            formGroupControlId="Region"
                        />
                        <FormGroup
                            formLabelText="Postal Code"
                            inputType="text"
                            inputValue={newPostalCode}
                            inputPlaceholder="Postal Code"
                            onChangeHandler={({ target }) => setNewPostalCode(target.value)}
                            requiredOrNot={true}
                            formGroupControlId="Postal Code"
                        />
                        <FormGroup
                            formLabelText="Phone"
                            inputType="text"
                            inputValue={newPhone}
                            inputPlaceholder="Phone Number"
                            onChangeHandler={({ target }) => setNewPhone(target.value)}
                            formGroupControlId="Phone"
                        />
                        <FormGroup
                            formLabelText="Fax"
                            inputType="text"
                            inputValue={newFax}
                            inputPlaceholder="Fax Number"
                            onChangeHandler={({ target }) => setNewFax(target.value)}
                            formGroupControlId="Fax"
                        />
                        <div className="d-flex mt-5 justify-content-end">
                            <Button
                                btnVariant="primary"
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

export default CustomerEdit;
