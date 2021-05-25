import React from "react";
import StoreSetup from './StoreSetup'
import Item from '../Item/Item'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Splash from '../Splash/Splash'
import { Button, Input } from "reactstrap";

type HomeProps = {
  sessionToken: string | null;
  userId: number
};

type HomeState = {
  contactInfo: string;
  id: number;
  storeArray: any;
  storeId: number;
  storeName: string
};

export default class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
    
        this.state = {
            contactInfo: '',
            id: 0,
            storeArray: '',
            storeId: 0,
            storeName: ''
        };
      }
        

  getStore = () => {
    fetch(`http://localhost:3586/store/mystore`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${ this.props.sessionToken }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // this.setState({storeArray: data});
        // this.setState({storeId: data.id})
        // this.setState({contactInfo: data.contactInfo})
        console.log(  data );
        // console.log(this.state.storeId);
        // console.log(this.state.contactInfo);
        
      });
  };

  componentDidMount = () => {
    this.getStore();
    this.setState({id: this.props.userId})
    console.log(this.state.storeArray);
  };

  changeStoreName = () => {
    fetch(`http://localhost:3586/store/update`, {
      method: "PUT",
      body: JSON.stringify({
        store: {storeId: this.state.storeId, 
        contactInfo: this.state.storeName}
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  deleteStoreName = () => {
    this.setState({storeName: ''})
    fetch(`http://localhost:3586/store/delete`, {
      method: "PUT",
      body: JSON.stringify({
        store: {storeId: this.state.storeId,
        contactInfo: this.state.storeName}
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  }
  

  render() {
    return (
      <div>
        <h1>{this.state.contactInfo}</h1>
        <br/>
        <h3>Change Store Name</h3>
        <Input onChange={(e) => this.setState({storeName: e.target.value })}/>
        <br/>
        <Button onClick={this.changeStoreName} >Change Name</Button>
        <br/>
        <br/>
        <Button onClick={this.deleteStoreName} >Delete Name</Button>
      </div>
    );
  }
}
