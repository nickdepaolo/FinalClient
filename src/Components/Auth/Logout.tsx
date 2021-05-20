import React from "react";
import { Button } from "reactstrap";

type AuthProps = {
  updateLogout: (newRoute: string) => any;
};

export default class Logout extends React.Component<AuthProps, {}> {
  removeToken = () => {
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
