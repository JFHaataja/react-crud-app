import {useState, useEffect} from 'react'
import UserService from 'services/User'
import User from 'features/users/services/User'
import UserAdd from 'features/users/services/UserAdd'
import UserEdit from 'features/users/services/UserEdit'
import Spinner from 'components/elements/Spinner/Spinner'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import { Container } from 'react-bootstrap'
import SearchBar from 'components/elements/Search/SearchBar'
import Table from 'react-bootstrap/Table'
import PlusIcon from 'components/elements/Icon/Plus'

const Users = ({setIsPositive, setShowMessage, setMessage}) => {

    const [users, setUsers] = useState([])
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaUser, setMuokattavaUser] = useState(false)
    const [search, setSearch] = useState("")
    const [spinnerContent, setSpinnerContent] = useState("")

    useEffect(() => {
        
        const token = localStorage.getItem('token')
        UserService.setToken(token)
        setSpinnerContent(<Spinner spinnerVariant="primary"/>)     

        UserService.getAll()
        .then(data => {
            setUsers(data)
            setSpinnerContent('')
        })
    },[lisäystila, reload, muokkaustila]
    )

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }

    const editUsers = (user) => {
        setMuokattavaUser(user)
        setMuokkaustila(true)        
    }

  return (
    <>
    <Container fluid className='bg-CustomersHeroCard h-25 py-2'>
        <div className='pt-5'>
            <h1 className='display-3 mb-3 text-white'>Users <span>&#128272;</span></h1>
            {!lisäystila && <Button btnVariant={'outline-secondary'} buttonText={"Add new User"} clickHandler={() => setLisäystila(true)} startIcon={<PlusIcon/>}/>}
        </div>
        <div className='m-auto w-50 my-5'>
            {!lisäystila && !muokkaustila && <SearchBar placeHolder={"Search by user's last name"} searchValue={search} onChangeHandler={handleSearchInputChange} />}    
        </div>
    </Container>

    <Container className='mt-5'>
        
        {lisäystila && <UserAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}

        {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} muokattavaUser={muokattavaUser}/>}
            
            <div>
                {spinnerContent}
            </div>
            <Table responsive hover variant="dark" className='text-start'>
                {!lisäystila && !muokkaustila &&
                <thead>
                    <tr>                       
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Access Level</th>
                        <th scope="col"></th>
                        <th scope="col"></th>                       
                    </tr>
                </thead>
                }
                <tbody>
            {
                !lisäystila && !muokkaustila && users && users.map(u => 
                    {           
                        const lowerCaseLastName = u.lastname.toLowerCase()
                                if(lowerCaseLastName.indexOf(search) > -1){
                                return (
                                    <User key={u.userId} user={u} reloadNow={reloadNow} reload={reload}
                                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                                    editUser={editUsers}/>
                                )}
                        else {
                            return (null)
                        }                   
                    })
            }
                </tbody>
                </Table>
    </Container>
    </>
  )}

export default Users