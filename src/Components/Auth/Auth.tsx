import React from "react";
// import {Container, Col, Row} from 'reactstrap';
import Signup from "./Signup";
import Login from "./Login";


type AuthProps = {
  updateToken: (newToken: string) => any;
  updateId:  (newId: number) => any;
  makerCheck: (maker: boolean) =>  any;

  updateStoreId: (storeId: number) => any
};

type AuthState = {};

export default class Auth extends React.Component<AuthProps, AuthState> {
  render() {
    return (
      <div>
        <Login updateStoreId={this.props.updateStoreId} updateToken={this.props.updateToken} updateId={this.props.updateId} makerCheck={this.props.makerCheck} />

        <Signup updateStoreId={this.props.updateStoreId} updateToken={this.props.updateToken} updateId={this.props.updateId} makerCheck={this.props.makerCheck} />

        
       

      </div>
    );
  }
}
