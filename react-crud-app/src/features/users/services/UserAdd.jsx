import 'assets/App.scss'
import {useState} from 'react'
import UserService from 'services/User'
import md5 from 'md5'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormGroup from 'components/elements/Form/FormGroup/FormGroup/FormGroup'
import FormGroupPassword from 'components/elements/Form/FormGroup/FormGroup/FormGroupPassword'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArrowLeft from 'components/elements/Icon/ArrowLeft'


const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newPasswordValidation, setNewPasswordValidation] = useState('')

const handleSubmit = (event) => {
      event.preventDefault()
      const newUser = {
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        username: newUsername,
        password: md5(newPassword),
        validation: md5(newPasswordValidation)
    }

    if(newUser.password === newUser.validation){
     
      UserService.create(newUser).then(response => {
        if (response.status === 200) {          
         setMessage(`Added new User: ${newUser.firstname} ${newUser.lastname}`)
         setIsPositive(true)
         setShowMessage(true)
         setTimeout(() => {setShowMessage(false)}, 5000) 
         setLisäystila(false)
        }
      })
         
        .catch(error => {
          setMessage(error)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000)
          setTimeout(() => {setShowMessage(false)}, 6000)
        }
        )
        
      }else {
        setMessage('Passwords do not match.')
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000)

        setTimeout(() => { setShowMessage(false)}, 6000)
      }
      }
      
      

  return (
<Container id="addNew" className='mt-4'>
<h2 className='text-white mb-3'>Add New User</h2>
<Button btnVariant={"outline-primary"} btnType={'button'} buttonText='Go Back' clickHandler={() => setLisäystila(false)} startIcon={<ArrowLeft/>} />
<Form onSubmit={handleSubmit} className="text-white text-start m-auto mt-3">
 <Row>
   <Col className="mx-0 mx-lg-5 px-0 px-lg-5">
     <FormGroup formLabelText={"First Name"} inputType="text" inputValue={newFirstname} inputPlaceholder="First Name" onChangeHandler={({ target }) => setNewFirstname(target.value)}/>
     <FormGroup formLabelText={"Last name"} inputType="text" inputValue={newLastname} inputPlaceholder="Last Name" onChangeHandler={({ target }) => setNewLastname(target.value)}/>
     <FormGroup formLabelText={"Email"} inputType="email" inputValue={newEmail} inputPlaceholder="Email" onChangeHandler={({ target }) => setNewEmail(target.value)} />
     <FormGroup formLabelText={"Access Level"} inputType="number" inputValue={newAccesslevelId} inputPlaceholder="Access Level" onChangeHandler={({ target }) => setNewAccesslevelId(target.value)} />
     <FormGroup formLabelText={"Username"} inputType="text" inputValue={newUsername} inputPlaceholder="Username" onChangeHandler={({ target }) => setNewUsername(target.value)} />
     <FormGroupPassword passwordType={'password'} passwordValue={newPassword} passwordPlaceholder="Password" onChangeHandler={({ target }) => setNewPassword(target.value)}/>
     <FormGroupPassword passwordType={'password'} passwordValue={newPasswordValidation} passwordPlaceholder="Confirm password" onChangeHandler={({ target }) => setNewPasswordValidation(target.value)}/>
     <div className='d-flex mt-5 justify-content-end'>
       <Button btnVariant={"primary"} btnType='submit' buttonText={'Confirm and Save'} />
     </div>
   </Col>
 </Row>
</Form>
</Container>
  )
}

export default UserAdd