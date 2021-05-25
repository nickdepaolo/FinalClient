import React from "react";
import { Button, Input } from "reactstrap";
import APIURL from '../../enviroment'

type CreateProps = {
  sessionToken: string | null;
  userId: number
};

type CreateState = {
  contactInfo: string;
  id: number | null
  makerTrue: boolean
};

export default class CreateStore extends React.Component<
  CreateProps,
  CreateState
>
 {

  newStore = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log(this.props.sessionToken);
    
    fetch(`${APIURL}/store/`, {
      method: "POST",
      body: JSON.stringify({
        store: {
          contactInfo: this.state.contactInfo,
          userId: this.props.userId
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
  render() {
    return (
      <div>
        <h3>Name your new store</h3>
        <Input
          onChange={(e) => this.setState({ contactInfo: e.target.value })}
        />
        <br />
        <Button onClick={this.newStore}>Store Name</Button>
      </div>
    );
  }
}
