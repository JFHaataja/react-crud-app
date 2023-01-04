import { useState, useEffect } from 'react';
import 'assets/App.scss';
import CustomerService from 'api/Customer';
import Customer from 'features/customers/Customer';
import CustomerAdd from 'features/customers/CustomerAdd';
import CustomerEdit from 'features/customers/CustomerEdit';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Spinner from 'components/elements/Spinner/Spinner';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import SearchBar from 'components/elements/Search/SearchBar';
import PlusIcon from 'assets/Icon/Plus';

const Customers = ({ setMessage, setIsPositive, setShowMessage }) => {
  const [customers, setCustomers] = useState([]);
  const [showCustomers, setShowCustomers] = useState(false);
  const [addNewMode, setAddNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [reload, reloadNow] = useState(false);
  const [customerForEdit, setCustomerForEdit] = useState(false);
  const [search, setSearch] = useState('');
  const [spinnerContent, setSpinnerContent] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    CustomerService.setToken(token);

    setSpinnerContent(<Spinner spinnerVariant="primary" />);

    CustomerService.getAll().then((data) => {
      setCustomers(data);
      setSpinnerContent('');
    });
  }, [addNewMode, reload, editMode]);

  const handleSearchInputChange = (event) => {
    setShowCustomers(true);
    setSearch(event.target.value.toLowerCase());
  };

  const editCustomers = (customer) => {
    setCustomerForEdit(customer);
    setEditMode(true);
  };

  return (
    <>
      <Container fluid className="bg-drinks h-25 py-2">
        <div className="pt-5">
          <h1 className="display-3 mb-3 text-white">
            Customers <span>&#127970;</span>
          </h1>
          {!addNewMode && (
            <Button
              clickHandler={() => setShowCustomers(!showCustomers)}
              buttonText="Show all customers"
            />
          )}
          {!addNewMode && (
            <Button
              btnVariant={'outline-secondary'}
              buttonText={'Add new customer'}
              clickHandler={() => setAddNewMode(true)}
              startIcon={<PlusIcon />}
            />
          )}
        </div>
        <div className="m-auto w-50 my-5">
          {!addNewMode && !editMode && (
            <SearchBar
              placeHolder={'Search by company name'}
              searchValue={search}
              onChangeHandler={handleSearchInputChange}
            />
          )}
        </div>
      </Container>

      <Container className="mt-5">
        {addNewMode && (
          <CustomerAdd
            setAddNewMode={setAddNewMode}
            setIsPositive={setIsPositive}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
          />
        )}

        {editMode && (
          <CustomerEdit
            setEditMode={setEditMode}
            setIsPositive={setIsPositive}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            customerForEdit={customerForEdit}
          />
        )}

        <div>{spinnerContent}</div>
        <Row>
          {!addNewMode &&
            !editMode &&
            showCustomers &&
            customers &&
            customers.map((c) => {
              const lowerCaseName = c.companyName.toLowerCase();
              if (lowerCaseName.indexOf(search) > -1) {
                return (
                  <Customer
                    key={c.customerId}
                    customer={c}
                    reloadNow={reloadNow}
                    reload={reload}
                    setIsPositive={setIsPositive}
                    setMessage={setMessage}
                    setShowMessage={setShowMessage}
                    editCustomer={editCustomers}
                  />
                );
              } else {
                return null;
              }
            })}
        </Row>
      </Container>
    </>
  );
};

export default Customers;
