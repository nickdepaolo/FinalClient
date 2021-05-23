import React from "react";
import { Navbar, NavbarBrand} from "reactstrap";
import { Link } from "react-router-dom";
import Logo from './Assets/ludioLogo.png';

const Sitebar: React.FunctionComponent = () => {
  return (
    <Navbar expand="md" className="App-header">
      <NavbarBrand href="/">
        <img src={Logo} alt="" />
      </NavbarBrand>

      <NavbarBrand>
        {localStorage.getItem("token") ? (
          <Link to="/home">My Store</Link>
        ) : (
          <Link to="/auth">Login or Signup</Link>
        )}
      </NavbarBrand>

      <NavbarBrand>
        {localStorage.getItem("token") ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <h4>Thanks for visiting</h4>
        )}
      </NavbarBrand>
    </Navbar>
  );
};

export default Sitebar;
