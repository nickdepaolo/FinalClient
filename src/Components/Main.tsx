import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Item from "./Item/Item";
import Sitebar from "./Nav";
import Auth from "./Auth/Auth";
import Splash from "./Splash/Splash";
import Home from "./Home/Home";
import Logout from "./Auth/Logout";
import Footer from "./Footer";

type MainProps = {};

type MainState = {
  sessionToken: string | null;
  updateLogout: string | null;
  id: number;
  maker: boolean,
  truth: boolean
};

export default class Main extends React.Component<MainProps, MainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      sessionToken: "",
      updateLogout: "",
      id: 0,
      maker: false,
      truth: false
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
    console.log(newId);
    this.setState({ id: newId });
    console.log(this.state.id);
  };

  updateLogout = (newRoute: string) => {
    this.setState({ updateLogout: newRoute });
  };

  protectedViews = () => {
    const token = this.state.sessionToken;

    return token === localStorage.getItem("token") ? (
     <Splash />) : 
      (<Auth sessionToken={this.state.sessionToken} updateToken={this.updateToken} updateId={this.updateId} makerCheck={this.makerCheck} />);
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
    (<Logout updateLogout={this.updateLogout}  sessionToken={this.state.sessionToken}/>) : 
    <Splash />;
  };

  makerCheck = (maker: boolean) => {
    this.setState({maker: maker});
    console.log(this.state.maker);
    
  }

 makerView = () => { 
   return this.state.maker === true? (<Home sessionToken={this.state.sessionToken} userId={this.state.id} />)
   : (<Splash />)
 }
 


  render() {
    return (
      <React.Fragment>
        <Router>
          <Sitebar maker={this.state.maker}/>
          <div>
            <div>
              <Switch>
                <Route exact path="/logout" component={this.logoutView} />
                <Route exact path="/auth" component={this.protectedViews} />
                <Route exact path="/home" component={this.makerView} />
                <Route exact path="/" component={Splash} />
              </Switch>
              <Footer />
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
