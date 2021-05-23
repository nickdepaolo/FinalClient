import React from "react";
// import {Container, Col, Row} from 'reactstrap';
import Signup from "./Signup";
import Login from "./Login";


type AuthProps = {
  updateToken: (newToken: string) => any;
  updateId:  (newId: number) => any
};

type AuthState = {};

export default class Auth extends React.Component<AuthProps, AuthState> {
  render() {
    return (
      <div>
        <Login updateToken={this.props.updateToken} updateId={this.props.updateId} />

        <Signup updateToken={this.props.updateToken} updateId={this.props.updateId}/>

        
       

      </div>
    );
  }
}
