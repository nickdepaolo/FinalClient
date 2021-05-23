import React from "react";
import StoreSetup from './StoreSetup'
import Item from '../Item/Item'

type HomeProps = {
  sessionToken: string | null;
  userId: number
};

type HomeState = {
  contactInfo: string;
  id: number
};

export default class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
    
        this.state = {
            contactInfo: '',
            id: 0
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
        this.setState({ contactInfo: data.contactInfo});
        this.setState({})
        console.log( data );
      });
  };

  componentDidMount = () => {
    this.getStore();
    this.setState({id: this.props.userId})
    console.log(this.state.id);
  };



  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {this.state.contactInfo? <StoreSetup sessionToken={this.props.sessionToken} userId={this.props.userId}/> : 
       <Item />}
      </div>
    );
  }
}
