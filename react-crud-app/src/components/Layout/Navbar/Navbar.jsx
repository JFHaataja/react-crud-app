import 'assets/App.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';
import Cart from 'assets/Icon/Cart';
import LogOut from 'assets/Icon/LogOut';

function NavbarDark({
 clickHandler,
 buttonText,
 brandText,
 adminUser,
 linkHome,
 linkUsers,
 linkProducts,
 linkCustomers,
 linkPosts,
 isNotAdmin,
}) {
 return (
  <>
   <Navbar className="shadow-lg" bg="dark" variant="dark" expand="lg">
    <Container className="py-md-2">
     <Link to={linkHome} className="nav-link text-primary fw-bold fs-4">
      {brandText} <Cart />
     </Link>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto gap-4">
       <Link className="nav-link" to={linkHome}>
        Home
       </Link>
       <Link className="nav-link" to={linkProducts}>
        Products
       </Link>
       <Link className="nav-link" to={linkCustomers}>
        Customers
       </Link>
       {!isNotAdmin && (
        <Link className="nav-link" to={linkUsers}>
         Users
        </Link>
       )}
       <Link className="nav-link" to={linkPosts}>
        Posts
       </Link>
       <Button
        className="nav-link"
        clickHandler={clickHandler}
        buttonText={buttonText}
        endIcon={<LogOut />}
       />
      </Nav>
     </Navbar.Collapse>
    </Container>
   </Navbar>
  </>
 );
}

export default NavbarDark;
