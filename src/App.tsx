import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Item from "../src/Components/Item/Item";
import Sitebar from "../src/Components/Nav";
import Auth from "../src/Components/Auth/Auth";
import Splash from "../src/Components/Splash/Splash";
import Logout from "../src/Components/Auth/Logout";
import Footer from "../src/Components/Footer";
import Home from "../src/Components/Home/Home"

type MainProps = {};

type MainState = {
  sessionToken: string | null;
  updateLogout: string | null;
  id: number;
  maker: boolean,
  truth: boolean,
  storeId: number
};

export default class Main extends React.Component<MainProps, MainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      sessionToken: "",
      updateLogout: "",
      id: 0,
      maker: false,
      truth: false,
      storeId: 0
    };
  }

  // getToken = () => {
  //   if (localStorage.getItem("token")) {
  //     console.log( localStorage.getItem("token"))
  //     this.setState({ sessionToken: localStorage.getItem("token") });
  //   } else {
  //     console.log('hitting else')
  //   }
  // };

  updateToken = (newToken: string) => {
    console.log(newToken);
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    // setTimeout(() => {
    //     console.log(this.state.sessionToken)
    // }, 1000)
  };

  updateId = (newId: number) => {
    // console.log(newId);
    this.setState({ id: newId });
    // console.log(this.state.id);
  };

  updateStoreId = (storeId: number) => {
    this.setState({storeId: storeId})
  }

  updateLogout = (newRoute: string) => {
    this.setState({ updateLogout: newRoute });
  };

  protectedViews = () => {
    const token = this.state.sessionToken;

    return token === localStorage.getItem("token") ? (
     <Splash />) : 
      (<Auth sessionToken={this.state.sessionToken} updateToken={this.updateToken} updateId={this.updateId} makerCheck={this.makerCheck} updateStoreId={this.updateStoreId} />);
  };


  logoutView = () => {
    const token = this.state.sessionToken;
    const localToken = localStorage.getItem('token');
    // console.log('stateToken', token);
    // console.log('localStoraageToken', localToken);
    // setTimeout(() => {
    //   console.log('state token', token)
    //   return this.setState({truth: false})
    
    // , 1000})
    
    return token === localToken ? 
    (<Logout updateLogout={this.updateLogout} sessionToken={this.state.sessionToken}/>) : 
    <Splash />;
  };

  makerCheck = (maker: boolean) => {
    this.setState({maker: maker});
    console.log(this.state.maker);
    
  }

 
  itemPage = () => {
    return <Item userId={this.state.id} storeId={this.state.storeId} sessionToken={this.state.sessionToken}/>
  }

 
 itemView = () => {
   console.log(this.state.sessionToken);
   
   return this.state.maker === true? (<Item userId={this.state.id} storeId={this.state.storeId} sessionToken={this.state.sessionToken}/>)
   : ''
 }

 storeView = () => {
   return this.state.maker === true? (<Home sessionToken={this.state.sessionToken} userId={this.state.id} />)
   : <Splash />
 }

//  componentDidMount(){
//    this.setState({sessionToken: localStorage.getItem("token")})
//  }



  render() {
    return (
      <div className="App">
      <React.Fragment>
        <Router>
          <Sitebar maker={this.state.maker}/>
          <div>
            <div>
              <Switch>
                <Route exact path="/auth" component={this.protectedViews} />
                <Route exact path="/logout" component={this.logoutView} />
                <Route exact path="/item" component={this.itemPage} />
                <Route exact path="/home" component={this.storeView} />
                <Route exact path="/" component={Splash} />
              </Switch>
                         
               <Footer />
            </div>
          </div>
        </Router>
      </React.Fragment>
      </div>
    );
  }
}

