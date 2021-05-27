import React from "react";
import { Navbar, NavbarBrand} from "reactstrap";
import { Link } from "react-router-dom";
import Logo from 'https://previews.123rf.com/images/eljanstock/eljanstock1811/eljanstock181115946/112445936-settings-vector-icon-isolated-on-transparent-background-settings-transparency-logo-concept.jpg';

type NavProps = {
  maker: boolean
}

export default class Sitebar extends React.Component <NavProps,{}>{

  componentDidMount(){
    let token = localStorage.getItem("token")
    console.log('maker', this.props.maker)
    console.log( 'token', localStorage.getItem("token"))
    localStorage.getItem('token')

  }

  render() {
    return(
      <Navbar expand="md" className="App-header">
    
      <Link to={'/'}>
      <NavbarBrand >
        <img id='logo' src={Logo} alt="" />
      </NavbarBrand>
      </Link>

      <NavbarBrand>
        {this.props.maker === true  ? (
          <Link className='link' to="/home">My Store</Link>
        ) : (
          ''
        )}
      </NavbarBrand>

      <NavbarBrand>
      {this.props.maker === true  ? (
          <Link className='link' to="/item">My Items</Link>
        ) : (
          ''
        )}
      </NavbarBrand>

      <NavbarBrand>
        {localStorage.getItem("token") ? (
          <Link className='link' to="/logout">Logout</Link>
        ) : (
          <Link className='link' to="/auth">Login or Signup</Link>
        )}
      </NavbarBrand>


    </Navbar>
    )
  }
}


