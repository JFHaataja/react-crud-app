import 'assets/App.scss'
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton'
import UserService from 'services/User'
import TrashIcon from 'components/elements/Icon/TrashCan'
import PenIcon from 'components/elements/Icon/Pen'

const User = ({user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    const deleteUser = (user) => {
        const response = window.confirm(`Remove user ${user.firstname} ${user.lastname}?`)
    
        if (response === true) {
        UserService.remove(user.userId)
        .then(res => {
            if (res.status === 200) {
            setMessage(`Successfully removed user ${user.firstname} ${user.lastname}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
    
            setTimeout(() => { setShowMessage(false)}, 5000)
            reloadNow(!reload)}            
            })

            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000)
        
                setTimeout(() => {setShowMessage(false)}, 6000)
            })   
        }
        else {
        setMessage('User deletion cancelled successfully.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)
    
            setTimeout(() => {setShowMessage(false)}, 5000)
        }
    }

  return (
    <>
            <tr>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.accesslevelId}</td>
                <td>            
                <Button clickHandler={() => editUser(user)} startIcon={<PenIcon/>}/>
                </td>
                <td>
                <Button clickHandler={() => deleteUser(user)} startIcon={<TrashIcon/>}/>
                </td>
            </tr>       
    </>
  )
}

export default User