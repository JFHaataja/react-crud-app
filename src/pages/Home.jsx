import 'assets/App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cart from 'assets/Icon/Cart';

function Home() {
  return (
    <Container fluid className="bg-home min-vh-100">
      <Row>
        <Col>
          <div className="mt-5 pt-5 text-white">
            <p className="fw-bold fs-4 text-primary">
              NW Traders <Cart />
            </p>
            <h1 className="display-1 fw-bold">Northwind CRUD Demo App</h1>
            <div className="mt-4 mb-5">
              <span className="badge bg-primary fs-5 rounded-pill me-3 mb-3 text-dark">
                <span className="fs-3 fw-normal">#</span>REACT
              </span>
              <span className="badge bg-primary fs-5 rounded-pill me-3 mb-3 text-dark">
                <span className="fs-3 me-1 fw-normal">#</span>ASP .NET CORE
              </span>
              <span className="badge bg-primary fs-5 rounded-pill me-3 mb-3 text-dark">
                <span className="fs-3 me-1 fw-normal">#</span>AXIOS
              </span>
              <span className="badge bg-primary fs-5 rounded-pill me-3 mb-3 text-dark">
                <span className="fs-3 me-1 fw-normal">#</span>REACT BOOTSTRAP
              </span>
              <span className="badge bg-primary fs-5 rounded-pill text-dark">
                <span className="fs-3 me-1 fw-normal">#</span>CRUD
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
