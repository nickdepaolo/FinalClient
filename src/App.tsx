import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Item from "../src/Components/Item/Item";
import Sitebar from "../src/Components/Nav";
import Auth from "../src/Components/Auth/Auth";
import Splash from "../src/Components/Splash/Splash";
import Logout from "../src/Components/Auth/Logout";
import Footer from "../src/Components/Footer";
import Home from "../src/Components/Home/Home";
import StoreSetup from "../src/Components/Home/StoreSetup"
import { GuardProvider, GuardedRoute } from 'react-router-guards'



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

  requireLogin = (to: any, from: any, next: { (): void; redirect: (arg0: string) => void; }) => {
    if (this.state.sessionToken !== localStorage.getItem('token')) {
      if (this.state.id == null||undefined) {
        next();
      }
      next.redirect('/login');
    } else {
      next();
    }
  };

  updateToken = (newToken: string) => {
    console.log(newToken);
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
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
      (<Auth  updateToken={this.updateToken} updateId={this.updateId} makerCheck={this.makerCheck} updateStoreId={this.updateStoreId} />);
  };


  logoutView = () => {
    const token = this.state.sessionToken;
    const localToken = localStorage.getItem('token');
  
    
    return token === localToken ? 
    (<Logout updateLogout={this.updateLogout} sessionToken={this.state.sessionToken}/>) : 
    <Splash />;
  };

  makerCheck = (maker: boolean) => {
    this.setState({maker: maker});
    console.log(this.state.maker);
  }

  itemPage = () => {
    return (<Item userId={this.state.id} storeId={this.state.storeId} sessionToken={this.state.sessionToken}/>)
  }
 
 itemView = () => {
   console.log(this.state.sessionToken);
   
   return this.state.maker === true? (<Item userId={this.state.id} storeId={this.state.storeId} sessionToken={this.state.sessionToken}/>)
   : ''
 }

 storeView = () => {
   return this.state.maker === true?  <Home sessionToken={this.state.sessionToken} userId={this.state.id} />
  
   : <Splash />
 }

setupView = () => {
  return this.state.storeId > 0 ? <Home sessionToken={this.state.sessionToken} userId={this.state.id} />
   : <StoreSetup sessionToken={this.state.sessionToken} userId={this.state.id}/>
}

// componentDidMount() {
//  if(localStorage.getItem('token')) {
//   this.setState({sessionToken: localStorage.getItem('token')})
//  }
// }

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
                <GuardProvider guards={[this.requireLogin]}>
                <Route exact path="/logout" component={this.logoutView} />
                <Route exact path="/item" component={this.itemPage} />
                <Route exact path="/home" component={this.storeView} />
                </GuardProvider>
                <Route exact path="/" component={Splash} />
              </Switch>
              <div className='foot'>
              <Footer />
              </div>
            </div>
          </div>
        </Router>
      </React.Fragment>
      </div>
    );
  }
}

