import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';


const Sitebar: React.FunctionComponent = () => {

    

        return(
            
            <Navbar expand="md" className="App-header">

                <NavbarBrand href="/">
                    MainLogo
                </NavbarBrand>

                <NavbarBrand>
                    <Link to="/item">Item</Link>
                </NavbarBrand>

                <NavbarBrand>
                    {localStorage.getItem( 'token' ) ? <Link to = '/home'>My Store</Link> : <Link to = '/auth'>Login or Signup</Link>}
                </NavbarBrand>

                <NavbarBrand>
                    {localStorage.getItem( 'token' ) ? <Link to = '/logout'>Logout</Link> : '' }
                </NavbarBrand>

            </Navbar>
        )
    
}

export default Sitebar; 