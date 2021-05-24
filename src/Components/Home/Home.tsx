import React from "react";
import StoreSetup from './StoreSetup'
import Item from '../Item/Item'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

type HomeProps = {
  sessionToken: string | null;
  userId: number
};

type HomeState = {
  contactInfo: string;
  id: number;
  storeArray: any;
  storeId: number;
};

export default class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
    
        this.state = {
            contactInfo: '',
            id: 0,
            storeArray: '',
            storeId: 0
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
        this.setState({storeArray: data});
        this.setState({storeId: data.id})
        this.setState({contactInfo: data.contactInfo})
        console.log(  data );
        console.log(this.state.storeId);
        console.log(this.state.contactInfo);
        
      });
  };

  componentDidMount = () => {
    this.getStore();
    this.setState({id: this.props.userId})
    console.log(this.state.storeArray);
    this.createSwap()
  };

  createSwap = () => {
  return this.state.storeArray === null ? (<StoreSetup sessionToken={this.props.sessionToken} userId={this.props.userId}/>) : 
       (<Item userId={this.props.userId} storeId={this.state.storeId} sessionToken={this.props.sessionToken}/>)
  }



  render() {
    return (
      <div>
        <h1>{this.state.contactInfo}</h1>
        <Switch>
          <Route exact path = '/home' component = {this.createSwap} />
        </Switch>
      </div>
    );
  }
}
