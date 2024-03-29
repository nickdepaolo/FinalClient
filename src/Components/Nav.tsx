import React from "react";
import { Navbar, NavbarBrand} from "reactstrap";
import { Link } from "react-router-dom";

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
        <h3>Ludio</h3>
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


