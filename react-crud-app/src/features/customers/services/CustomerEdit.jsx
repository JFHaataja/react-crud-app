import 'assets/App.scss'
import {useState} from 'react'
import CustomerService from 'features/customers/services/Customer'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArrowLeft from 'components/elements/Icon/ArrowLeft'

const CustomerEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {

// Komponentin tilan määritys

const [newCustomerId] = useState(muokattavaCustomer.customerId)
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)
const [newRegion, setNewRegion] = useState(muokattavaCustomer.region)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      const newCustomer = {
        customerId: newCustomerId,
        companyName: newCompanyName,
        contactName: newContactName,
        contactTitle: newContactTitle,
        country: newCountry,
        address: newAddress,
        city: newCity,
        region: newRegion,
        postalCode: newPostalCode,
        phone: newPhone,
        fax: newFax
    }
    
    CustomerService.update(newCustomer)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited Customer: " + newCustomer.companyName)
       setIsPositive(true)
       setShowMessage(true)
       window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
       setTimeout(() => {setShowMessage(false)}, 5000)
       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000)
        setTimeout(() => {setShowMessage(false)}, 6000)
      })
    }


  return (
    <Container className='mt-4'>
    <h2 className='text-white mb-3'>Edit Customer</h2>
    <Button btnVariant={"outline-primary"} btnType={'button'} buttonText='Go Back' clickHandler={() => setMuokkaustila(false)} startIcon={<ArrowLeft/>} />
    <Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
     <Row>
       <Col>
         <FormGroup formLabelText={"Customer ID"} inputType="text" inputValue={newCustomerId} inputPlaceholder="ID with 5 capital letters" inputMaxLength={"5"} inputMinLength={"5"} disabled />
         <FormGroup formLabelText={"Company Name"} inputType="text" inputValue={newCompanyName} inputPlaceholder="Company Name" onChangeHandler={({ target }) => setNewCompanyName(target.value)} required />
         <FormGroup formLabelText={"Contact Name"} inputType="text" inputValue={newContactName} inputPlaceholder="Contact Name" onChangeHandler={({ target }) => setNewContactName(target.value)} />
         <FormGroup formLabelText={"Contact Title"} inputType="text" inputValue={newContactTitle} inputPlaceholder="Contact Title" onChangeHandler={({ target }) => setNewContactTitle(target.value)} />
         <FormGroup formLabelText={"Country"} inputType="text" inputValue={newCountry} inputPlaceholder="Country" onChangeHandler={({ target }) => setNewCountry(target.value)} />
         <FormGroup formLabelText={"Address"} inputType="text" inputValue={newAddress} inputPlaceholder="Address" onChangeHandler={({ target }) => setNewAddress(target.value)} />
       </Col>
       <Col>
         <FormGroup formLabelText={"City"} inputType="text" inputValue={newCity} inputPlaceholder="City" onChangeHandler={({ target }) => setNewCity(target.value)} />
         <FormGroup formLabelText={"Region"} inputType="text" inputValue={newRegion} inputPlaceholder="Region" onChangeHandler={({ target }) => setNewRegion(target.value)} />
         <FormGroup formLabelText={"Postal Code"} inputType="text" inputValue={newPostalCode} inputPlaceholder="Postal Code" onChangeHandler={({ target }) => setNewPostalCode(target.value)} />
         <FormGroup formLabelText={"Phone"} inputType="text" inputValue={newPhone} inputPlaceholder="Phone Number" onChangeHandler={({ target }) => setNewPhone(target.value)} />
         <FormGroup formLabelText={"Fax"} inputType="text" inputValue={newFax} inputPlaceholder="Fax Number" onChangeHandler={({ target }) => setNewFax(target.value)} />
         <div className='d-flex mt-5 justify-content-end'>
           <Button btnVariant={"primary"} btnType='submit' buttonText={'Confirm and Save'} />
         </div>
       </Col>
     </Row>
    </Form>
 </Container>
  )
}

export default CustomerEdit