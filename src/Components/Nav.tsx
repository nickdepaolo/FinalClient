import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';


const Sitebar: React.FunctionComponent = () => {

        return(
            
            <Navbar expand="md" className="App-header">

                <NavbarBrand href="/">
                    Home
                </NavbarBrand>

                <Nav>

                    <NavItem>
                        <Link to="/item">Item</Link>
                    </NavItem>

                    <NavItem>
                        <Link to = '/auth'>Login or Signup</Link>
                    </NavItem>

                </Nav>

            </Navbar>
        )
    
}

export default Sitebar; 