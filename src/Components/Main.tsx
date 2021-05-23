import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Item from "./Item/Item";
import Sitebar from "./Nav";
import Auth from "./Auth/Auth";
import Splash from "./Splash/Splash";
import Home from "./Home/Home";
import Logout from "./Auth/Logout";
import Footer from "./Footer"
type MainProps = {};

type MainState = {
  sessionToken: string | null;
  updateLogout: string | null;
  id: number
};

export default class Main extends React.Component<MainProps, MainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      sessionToken: "",
      updateLogout: "",
      id: 0
    };
  }

  getToken = () => {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  };

  updateToken = (newToken: string) => {
    console.log(newToken);
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  updateId = (newId: number) => {
    console.log(newId);
    this.setState({id: newId});
    console.log(this.state.id);
    
  }

  updateLogout = (newRoute: string) => {
    this.setState({ updateLogout: newRoute });
  };

  protectedViews = () => {
    const token = this.state.sessionToken;

    return token === localStorage.getItem("token") ? (
      <Home sessionToken={this.state.sessionToken} userId={this.state.id}/>
    ) : (
      <Auth updateToken={this.updateToken} updateId={this.updateId}/>
    );
  };

  logoutView = () => {
    const token = this.state.sessionToken;

    return token === localStorage.getItem("token") ? (
      <Logout updateLogout={this.updateLogout} />
    ) : (
      <Splash />
    );
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Sitebar />
          <div onChange={this.getToken}>
            <div>
              <Switch>
                <Route exact path="/" component={Splash} />
                <Route exact path="/logout" component={this.logoutView} />
                <Route exact path="/auth" component={this.protectedViews} />
                <Route exact path="/home" component={Home} />
              </Switch>
          <Footer />
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
