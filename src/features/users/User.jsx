import 'assets/App.scss';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import UserService from 'api/User';
import TrashIcon from 'assets/Icon/TrashCan';
import PenIcon from 'assets/Icon/Pen';

const User = ({ user, editUser, setPositiveMessage, setMessage, setShowMessage, reload, reloadNow }) => {
    const deleteUser = (user) => {
        const response = window.confirm(`Remove user ${user.firstname} ${user.lastname}?`);

        if (response === true) {
            UserService.remove(user.userId)
                .then((res) => {
                    if (res.status === 200) {
                        setMessage(`Successfully removed user ${user.firstname} ${user.lastname}`);
                        setPositiveMessage(true);
                        setShowMessage(true);
                        window.scrollBy(0, -10000);

                        setTimeout(() => {
                            setShowMessage(false);
                        }, 5000);
                        reloadNow(!reload);
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
        } else {
            setMessage('User deletion cancelled successfully.');
            setPositiveMessage(true);
            setShowMessage(true);
            window.scrollBy(0, -10000);

            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    };

    return (
        <>
            <tr>
                <td>
                    <img
                        src="https://images.unsplash.com/photo-1635244621620-ccadff2eb29d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        className="img-fluid vh-7 my-2 rounded-pill"
                        alt=""
                    />
                </td>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.accesslevelId}</td>
                <td>
                    <Button
                        clickHandler={() => editUser(user)}
                        startIcon={<PenIcon />}
                        dataCy="btnEdit"
                        buttonId={`btnEdit${user.username}`}
                    />
                </td>
                <td>
                    <Button
                        clickHandler={() => deleteUser(user)}
                        startIcon={<TrashIcon />}
                        dataCy="btnDelete"
                        buttonId={`btnDelete${user.username}`}
                    />
                </td>
            </tr>
        </>
    );
};

export default User;
