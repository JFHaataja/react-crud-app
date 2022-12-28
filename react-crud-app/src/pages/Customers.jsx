import { useState, useEffect } from 'react'
import 'assets/App.scss'
import CustomerService from 'services/Customer'
import Customer from 'features/customers/services/Customer'
import CustomerAdd from 'features/customers/services/CustomerAdd'
import CustomerEdit from 'features/customers/services/CustomerEdit'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import Spinner from 'components/elements/Spinner/Spinner'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import SearchBar from 'components/elements/Search/SearchBar'
import PlusIcon from 'components/elements/Icon/Plus'

const Customers = ({setMessage, setIsPositive, setShowMessage}) => {

    const [customers, setCustomers] = useState([])
    const [showCustomers, setShowCustomers] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
    const [search, setSearch] = useState("")
    const [spinnerContent, setSpinnerContent] = useState('')

    useEffect(() => {
        
        const token = localStorage.getItem('token')
        CustomerService.setToken(token)
        
        setSpinnerContent(<Spinner spinnerVariant="primary"/>)  
        
        CustomerService.getAll()
        .then(data => {
            setCustomers(data)
            setSpinnerContent('')
        })
    },[lisäystila, reload, muokkaustila]
    )

    const handleSearchInputChange = (event) => {
        setShowCustomers(true)
        setSearch(event.target.value.toLowerCase())
    }

    const editCustomer = (customer) => {
        setMuokattavaCustomer(customer)
        setMuokkaustila(true)
    }

  return (
    <>
    
    <Container fluid className='bg-CustomersHeroCard h-25 py-2'>
        <div className='pt-5'>
            <h1 className='display-3 mb-3 text-white'>Customers <span>&#127970;</span></h1>
            {!lisäystila && <Button clickHandler={() => setShowCustomers(!showCustomers)} buttonText='Show all customers'/>}
            {!lisäystila && <Button btnVariant={'outline-secondary'} buttonText={"Add new customer"} clickHandler={() => setLisäystila(true)} startIcon={<PlusIcon/>}/>}
        </div>
        <div className='m-auto w-50 my-5'>
            {!lisäystila && !muokkaustila && <SearchBar placeHolder={"Search by company name"} searchValue={search} onChangeHandler={handleSearchInputChange} />}    
        </div>
    </Container>
    
    <Container className='mt-5'>
               
        {lisäystila && <CustomerAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}

        {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} muokattavaCustomer={muokattavaCustomer}/>}
    
        <div>
            {spinnerContent}
        </div>
            <Row>
            {
                !lisäystila && !muokkaustila && showCustomers && customers && customers.map(c => 
                    {
                        const lowerCaseName = c.companyName.toLowerCase()
                        if(lowerCaseName.indexOf(search) > -1){
                        return (
                            <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                            editCustomer={editCustomer}/>
                                )}
                        else {
                            return (null)
                        }
                    })
            }
            </Row>
    </Container>
            
    </>    
  )}

export default Customers