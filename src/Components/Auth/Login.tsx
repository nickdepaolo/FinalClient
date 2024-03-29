import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


type AuthProps = {
  updateToken: (newToken: string) => any;
  updateId:  (newId: number) => any
  makerCheck: (maker: boolean) =>  any;
  updateStoreId: (storeId: number) => any
};

type AuthState = {
  email: string;
  password: string;
  storeId: number
  sessionToken: string
};

export default class Login extends React.Component<AuthProps, AuthState> {
  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    

    if (this.state.password.length < 5 || this.state.password.length > 16) {
      alert("Please enter a password between 5 and 16 characters");
    } else {
      fetch(`${process.env.REACT_APP_API_SERVER_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          user: { email: this.state.email, password: this.state.password },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
          this.props.updateToken(data.token);
          this.setState({sessionToken: data.token})
          this.props.updateId(data.user.id);
          console.log(data.user.maker);
          console.log(data.user.id);
          this.props.makerCheck(data.user.maker)
          setTimeout(() => this.checkToken, 1000)
        })
    }
  };

  checkToken() {
    if(this.state.sessionToken.length > 1){
      this.getStore()
    }
  }

  getStore = () => {
    console.log('fetch');
    console.log(this.state.sessionToken);
    
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/store/mystore`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ this.state.sessionToken }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      
        this.setState({storeId: data.id})
        this.props.updateStoreId(data.id)
        console.log(  data );
        console.log(this.state.storeId);
       
      });
  };

  render() {
    return (
      <div>
        <h3 className='formhead' >Login</h3>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">E-mail </Label>
          </FormGroup>

          <FormGroup>
            <Input
              onChange={(e) => this.setState({ email: e.target.value })}
            
            />
          </FormGroup>

          <br />

          <FormGroup>
            <Label htmlFor="password">Password </Label>
          </FormGroup>

          <FormGroup>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              
            />
          </FormGroup>

          <br />

          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
