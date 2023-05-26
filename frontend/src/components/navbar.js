import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mess App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Student</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Mess Staff</NavDropdown.Item> 
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;