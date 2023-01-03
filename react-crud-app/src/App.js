import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from 'components/Layout/Navbar/Navbar';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Users from 'pages/Users';
import Products from 'pages/Products';
import Customers from 'pages/Customers';
import Posts from 'pages/Posts';
import ErrorPage from 'pages/ErrorPage';
import Message from 'components/elements/Message/Message';

const App = () => {
 const [spinner, showSpinner] = useState('false');
 const [message, setMessage] = useState('');
 const [isPositive, setIsPositive] = useState(true);
 const [showMessage, setShowMessage] = useState('');
 const [loggedInUser, setLoggedInUser] = useState('');
 const [adminUser, setAdminUser] = useState('');

 useEffect(() => {
  const storedUser = localStorage.getItem('username');
  if (storedUser !== null) {
   setLoggedInUser(storedUser);
  }
 }, []);

 useEffect(() => {
  const storedUserAccessLevelId = localStorage.getItem('accesslevelId');
  if (storedUserAccessLevelId !== null) {
   setAdminUser(storedUserAccessLevelId);
  } else {
   setAdminUser(null);
  }
 }, []);

 const logout = () => {
  localStorage.clear();
  setLoggedInUser('');
 };

 return (
  <div className="App">
   {!loggedInUser && (
    <div className="bg-login">
     {!loggedInUser && (
      <Login
       className="bg-login"
       spinner={spinner}
       showSpinner={showSpinner}
       setMessage={setMessage}
       setIsPositive={setIsPositive}
       setShowMessage={setShowMessage}
       setLoggedInUser={setLoggedInUser}
       setAdminUser={setAdminUser}
      />
     )}
    </div>
   )}

   {loggedInUser && (
    <Router>
     <Navbar
      clickHandler={() => logout()}
      linkHome={'/'}
      linkUsers={'/Users'}
      linkProducts={'/Products'}
      linkCustomers={'/Customers'}
      linkPosts={'/Posts'}
      brandText={'NW TRADERS'}
      buttonText={'Log out'}
      isNotAdmin={!adminUser}
     />
     {showMessage && <Message message={message} isPositive={isPositive} />}
     <Routes>
      <Route path="/" element={<Home />} />

      <Route
       path="/Products"
       element={
        <Products
         setMessage={setMessage}
         setIsPositive={setIsPositive}
         setShowMessage={setShowMessage}
         spinner={spinner}
         showSpinner={showSpinner}
        />
       }
      />

      <Route
       path="/Customers"
       element={
        <Customers
         setMessage={setMessage}
         setIsPositive={setIsPositive}
         setShowMessage={setShowMessage}
        />
       }
      />

      {adminUser && (
       <Route
        path="/Users"
        element={
         <Users
          setMessage={setMessage}
          setIsPositive={setIsPositive}
          setShowMessage={setShowMessage}
          spinner={spinner}
          showSpinner={showSpinner}
         />
        }
       />
      )}

      <Route path="/Posts" element={<Posts />} />

      <Route path="*" element={<ErrorPage />} />
     </Routes>
    </Router>
   )}
  </div>
 );
};

export default App;
