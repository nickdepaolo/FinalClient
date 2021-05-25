import React from "react";
import { Button } from "reactstrap";
import APIURL from '../../enviroment'


type AuthProps = {
  updateLogout: (newRoute: string) => any
  sessionToken: string | null
};

export default class Logout extends React.Component<AuthProps, {}> {
  removeToken = () => {
    console.log(this.props.sessionToken)
    localStorage.removeItem("token");
    this.props.updateLogout("Splash");
  };

  render() {
    return (
      <div>
        <h4>Are you sure you want to logout?</h4>

        <div>
          <Button onClick={this.removeToken}> Logout </Button>
        </div>
      </div>
    );
  }
}
