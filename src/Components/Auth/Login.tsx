import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

type AuthProps = {
  updateToken: (newToken: string) => any;
  updateId:  (newId: number) => any
};

type AuthState = {
  email: string;
  password: string;
};

export default class Login extends React.Component<AuthProps, AuthState> {
  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (this.state.password.length < 5 || this.state.password.length > 16) {
      alert("Please enter a password between 5 and 16 characters");
    } else {
      fetch(`http://localhost:3586/user/login`, {
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
            console.log(data.user.id);
            
          this.props.updateToken(data.token);
          this.props.updateId(data.user.id);
        });
    }
  };

  render() {
    return (
      <div>
        <h3>Login</h3>

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

          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
