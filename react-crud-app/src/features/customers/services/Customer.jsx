import {useState} from 'react'
import 'assets/App.scss'
import CustomerService from 'services/Customer'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import {Col} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import TrashIcon from 'components/elements/Icon/TrashCan'
import PenIcon from 'components/elements/Icon/Pen'

const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    const [showDetails, setShowDetails] = useState(false)

    const deleteCustomer = (customer) => {
        const response = window.confirm(`Remove Customer ${customer.companyName}`)
    
        if (response === true) {
        CustomerService.remove(customer.customerId)
        .then(res => {
            if (res.status === 200) {
            setMessage(`Successfully removed customer ${customer.companyName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
    
            setTimeout(() => {setShowMessage(false)}, 5000)
            reloadNow(!reload)}
            
                }
            )
            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000)
        
                setTimeout(() => {setShowMessage(false)}, 6000)
              })
    
        }
        else {
        setMessage('Customer deletion cancelled successfully.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)
    
            setTimeout(() => {setShowMessage(false)}, 5000)
        }
    }
    

    // hover-jutut oli: onMouseEnter={() => setShowDetails(true)} ja onMouseLeave={() => setShowDetails(false)}
  return (
    <Col lg={6} className="mb-4">
    <Card onClick={() => setShowDetails(!showDetails)} className='h-100 bg-secondary cursor-pointer text-dark'>
    <Card.Header className='border-0 bg-secondary pt-5'>
        <h4>{customer.companyName}, {customer.country}</h4>
    </Card.Header>
    <Card.Body className="h-100">

        
        {showDetails && 
            <div>
                <div className='mb-3'>
                    <Button clickHandler={() => deleteCustomer(customer)} startIcon={<TrashIcon/>}/>
                    <Button clickHandler={() => editCustomer(customer)} startIcon={<PenIcon/>}/>
                </div>
                <Table responsive variant="dark" className='text-start'>
                    <thead>
                        <tr>
                            <th>Contact Person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                </Table>         
            </div>
        }
    </Card.Body>
    </Card>
    </Col>
  )
}

export default Customer