import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoblanc from '../images/logoblanc.png';

function NavbarComponent() {
  return (
    <>
      <Navbar style={{ backgroundColor: 'transparent' }}>
        <Container>
          <Navbar.Brand href="/home" >
          <img src={logoblanc} alt="logo" style={{width:'200px'}} />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/messages" style={{ color: 'white' }}>
            Accueil
            </Nav.Link>
            <Nav.Link href="/notification" style={{ color: 'white' }}>
            Nos Formations
            </Nav.Link>
            {/* <Nav.Link href="/notification" style={{ color: 'white' }}>
            Service
            </Nav.Link>
            <Nav.Link href="/notification" style={{ color: 'white' }}>
            Tarifs
            </Nav.Link>
            <Nav.Link href="/notification" style={{ color: 'white' }}>
            Blog
            </Nav.Link> */}
            
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;