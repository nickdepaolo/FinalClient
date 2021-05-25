import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import StoreSetup from "../Home/StoreSetup"
import APIURL from '../../enviroment'


type AuthProps = {
  updateToken: (newToken: string) => any;
  updateId: (newId: number) => any;
  makerCheck: (maker: boolean) => any;
  updateStoreId: (storeId: number) => any
};

type AuthState = {
  email: string;
  password: string;
  userName: string;
  maker: boolean;
  storeId: number;
  admin: boolean;
  sessionToken: string
  userId: number | null | string
};

export default class Signup extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      userName: "",
      maker: true,
      storeId: 0,
      admin: false,
      sessionToken: '',
      userId: 0
    };
  }

  handleSubmit = (e: { preventDefault: () => void; }) => {
    console.log(this.state);
    e.preventDefault()
    if (this.state.password.length < 5 || this.state.password.length > 16) {
      alert("Please enter a password between 5 and 16 characters");
    } else {
      fetch(`${APIURL}/user/register`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            password: this.state.password,
            email: this.state.email,
            maker: this.state.maker,
            admin: this.state.admin,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          
        this.props.updateToken(data.sessionToken);
        this.setState({sessionToken: data.sessionToken});
        this.setState({userId: data.user.id});
        this.props.updateId(data.user.id);
        console.log(data.user.id);
        console.log(this.state.userId);
        this.props.makerCheck(data.user.maker);
        console.log(this.props);
        console.log(this.state);
        localStorage.setItem("user", data.user.id);
        setTimeout(() => {
         this.storageFunction()
          }, 1000)
        
      });
    }
  };
  
  storageFunction = () => {
    console.log(this.state.userId);
    console.log(localStorage.getItem('user'));
    
    return localStorage.getItem("user") ? this.newStore() : ''

  }

  newStore = () => {
  
    console.log('fetch');
    
    fetch(`${APIURL}/store/`, {
      method: "POST",
      body: JSON.stringify({
        store: {

          userId: localStorage.getItem('user')
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
      });
  };

  // swapCheck = () => {
  //   let x = this.state.maker;
  //   x === true
  //     ? this.setState({ maker: false})
  //     : this.setState({ maker: true });
  //   console.log(this.state.maker);
  // };

  render() {
    return (
      <div>
        <h3>Sign Up</h3>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">E-mail </Label>
          </FormGroup>

          <FormGroup>
            <Input
              onChange={(e) => this.setState({ email: e.target.value })}
              name="email"
              type="email"
            />
          </FormGroup>

          <br />

          <FormGroup>
            <Label htmlFor="password">Password </Label>
          </FormGroup>

          <FormGroup>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              type="password"
            />
          </FormGroup>

          <br />

          {/* <FormGroup>
            <Label>Are you starting a store? </Label>
            <Input onChange={this.swapCheck} type="checkbox" />
          </FormGroup> */}

          <br />

          <Button type="submit">Sign Up</Button>
          
        </Form>
      </div>
    );
  }
}
