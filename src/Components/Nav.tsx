import React from "react";
import { Navbar, NavbarBrand} from "reactstrap";
import { Link } from "react-router-dom";
import Logo from './Assets/ludioLogo.png';

type NavProps = {
  maker: boolean
}

export default class Sitebar extends React.Component <NavProps,{}>{

  componentDidMount(){
    // let token = localStorage.getItem("token")
    console.log('maker', this.props.maker)
    console.log( 'token', localStorage.getItem("token"))

  }

  render() {
    return(
      <Navbar expand="md" className="App-header">
    
      <Link to={'/'}>
      <NavbarBrand >
        <img src={Logo} alt="" />
      </NavbarBrand>
      </Link>

      <NavbarBrand>
        {this.props.maker === true  ? (
          <Link to="/home">My Store</Link>
        ) : (
          ''
        )}
      </NavbarBrand>

      <NavbarBrand>
      {this.props.maker === true  ? (
          <Link to="/item">My Items</Link>
        ) : (
          ''
        )}
      </NavbarBrand>

      <NavbarBrand>
        {localStorage.getItem("token") ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/auth">Login or Signup</Link>
        )}
      </NavbarBrand>


    </Navbar>
    )
  }
}


