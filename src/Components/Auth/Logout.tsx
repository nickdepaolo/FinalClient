import React from "react";
import { Button } from "reactstrap";

export default class Logout extends React.Component<{}, {}> {
  removeToken = () => {
    localStorage.removeItem("token");
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
