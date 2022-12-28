import 'assets/App.scss'
import {useState} from 'react'
import UserService from 'services/User'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArrowLeft from 'components/elements/Icon/ArrowLeft'


const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {
// Komponentin tilan määritys

const [newUserId] = useState(muokattavaUser.userId)
const [newUsername, setNewUsername] = useState(muokattavaUser.username)
const [newPassword] = useState(muokattavaUser.password)
const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname)
const [newLastname, setNewLastname] = useState(muokattavaUser.lastname)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)
const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)

const handleSubmit = (event) => {
      event.preventDefault()
      const newUser = {
        userId: newUserId,
        username: newUsername,
        password: newPassword,
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId)
    }
    
    UserService.update(newUser)
    .then(response => {
      if (response.status === 200) {
      setMessage("Edited User: " + newUser.username)
       setIsPositive(true)
       setShowMessage(true)
       window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
       setTimeout(() => { setShowMessage(false)}, 5000)
       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000)
        setTimeout(() => { setShowMessage(false) }, 6000)
      })
    }


  return (
    <Container id="editUser" className='mt-4'>
    <h2 className='text-white mb-3'>Edit User</h2>
    <Button btnVariant={"outline-primary"} btnType={'button'} buttonText='Go Back' value='back' clickHandler={() => setMuokkaustila(false)} startIcon={<ArrowLeft/>} />
    <Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
     <Row>
       <Col className="mx-0 mx-lg-5 px-0 px-lg-5">
         <FormGroup formLabelText={"User ID"} inputType="text" inputValue={newUserId} disabled/>
         <FormGroup formLabelText={"Username"} inputType="text" inputValue={newUsername} inputPlaceholder="User Name" onChangeHandler={({ target }) => setNewUsername(target.value)} />
         <FormGroup formLabelText={"First Name"} inputType="text" inputValue={newFirstname} inputPlaceholder="First Name" onChangeHandler={({ target }) => setNewFirstname(target.value)} />
         <FormGroup formLabelText={"Last Name"} inputType="text" inputValue={newLastname} inputPlaceholder="Last Name" onChangeHandler={({ target }) => setNewLastname(target.value)} />
         <FormGroup formLabelText={"Email"} inputType="email" inputValue={newEmail} inputPlaceholder="Email" onChangeHandler={({ target }) => setNewEmail(target.value)} />
         <FormGroup formLabelText={"Access Level (1=admin, 0=basic user)"} inputType="number" inputValue={newAccesslevelId} inputPlaceholder="Access Level" onChangeHandler={({ target }) => setNewAccesslevelId(target.value)}/>
         <div className='d-flex mt-5 justify-content-end'>
         <Button btnVariant={"primary"} btnType={'submit'} buttonText={'Confirm and Save'} value={'save'} />
         </div>
       </Col>
     </Row>
    </Form>
 </Container>
  )
}

export default UserEdit