import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarC() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">SA Coaching</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/messages">
            <FontAwesomeIcon icon={faMessage} />
            </Nav.Link>
            <Nav.Link href="/notification">
            <FontAwesomeIcon icon={faBell}/>
            </Nav.Link>
            <NavDropdown title="nom prénom">
            <NavDropdown.Item href="/home">
                Home
              </NavDropdown.Item>
              <NavDropdown.Item href="/home">
                profil
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item >
                Item
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarC;