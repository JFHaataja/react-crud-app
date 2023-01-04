import { useState, useEffect } from 'react';
import 'assets/App.scss';
import UserService from 'api/User';
import User from 'features/users/User';
import UserAdd from 'features/users/UserAdd';
import UserEdit from 'features/users/UserEdit';
import Spinner from 'components/elements/Spinner/Spinner';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import SearchBar from 'components/elements/Search/SearchBar';
import Table from 'react-bootstrap/Table';
import PlusIcon from 'assets/Icon/Plus';

const Users = ({ setIsPositive, setShowMessage, setMessage, showSpinner }) => {
  const [users, setUsers] = useState([]);
  const [addNewMode, setAddNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [reload, reloadNow] = useState(false);
  const [userForEdit, setUserForEdit] = useState(false);
  const [search, setSearch] = useState('');
  const [spinnerContent, setSpinnerContent] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    UserService.setToken(token);
    showSpinner(true);
    setSpinnerContent(<Spinner spinnerVariant="primary" />);

    UserService.getAll().then((data) => {
      setUsers(data);
      showSpinner(false);
      setSpinnerContent('');
    });
  }, [addNewMode, reload, editMode]);

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const editUsers = (user) => {
    setUserForEdit(user);
    setEditMode(true);
  };

  return (
    <>
      <Container fluid className="bg-drinks h-25 py-2">
        <div className="pt-5">
          <h1 className="display-3 mb-3 text-white">
            Users <span>&#128272;</span>
          </h1>
          {!editMode && (
            <Button
              btnVariant={'outline-secondary'}
              buttonText={'Add new User'}
              clickHandler={() => setAddNewMode(true)}
              startIcon={<PlusIcon />}
            />
          )}
        </div>
        <div className="m-auto w-50 my-5">
          {!addNewMode && !editMode && (
            <SearchBar
              placeHolder={"Search by user's last name"}
              searchValue={search}
              onChangeHandler={handleSearchInputChange}
            />
          )}
        </div>
      </Container>

      <Container className="mt-5">
        {addNewMode && (
          <UserAdd
            setAddNewMode={setAddNewMode}
            setIsPositive={setIsPositive}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
          />
        )}

        {editMode && (
          <UserEdit
            setEditMode={setEditMode}
            setIsPositive={setIsPositive}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            userForEdit={userForEdit}
          />
        )}

        {!addNewMode && !editMode && <div>{spinnerContent}</div>}

        <Col className="p-2 m-auto" md={12}>
          <Table responsive hover variant="dark" className="text-start ps-5">
            {!addNewMode && !editMode && (
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Username</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Access Level</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
            )}
            <tbody>
              {!addNewMode &&
                !editMode &&
                users &&
                users.map((u) => {
                  const lowerCaseUsername = u.username.toLowerCase();
                  if (lowerCaseUsername.indexOf(search) > -1) {
                    return (
                      <User
                        key={u.userId}
                        user={u}
                        reloadNow={reloadNow}
                        reload={reload}
                        setIsPositive={setIsPositive}
                        setMessage={setMessage}
                        setShowMessage={setShowMessage}
                        editUser={editUsers}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            </tbody>
          </Table>
        </Col>
      </Container>
    </>
  );
};

export default Users;
