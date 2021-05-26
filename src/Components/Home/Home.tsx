import React from "react";
import StoreSetup from "./StoreSetup";
import Item from "../Item/Item";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Splash from "../Splash/Splash";
import { Button, Input } from "reactstrap";

type HomeProps = {
  sessionToken: string | null;
  userId: number;
};

type HomeState = {
  contactInfo: string;
  id: number;
  storeArray: any;
  storeId: number;
  storeName: string;
  sessionToken: string;
  userId: number;
};

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      contactInfo: "",
      id: 0,
      storeArray: "",
      storeId: 0,
      storeName: "",
      sessionToken: "",
      userId: 0,
    };
  }

  getStore = () => {
    console.log(this.props);

    fetch(`${process.env.REACT_APP_API_SERVER_URL}/store/mystore`, {
      method: "GET",

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ storeArray: data });
        this.setState({ storeId: data.id });
        this.setState({ contactInfo: data.contactInfo });
        console.log(this.state.storeId);
        console.log(this.state.contactInfo);
      });
  };

  componentDidMount = () => {
    console.log(this.state.storeArray);
    this.getStore();
    this.setState({ id: this.props.userId });
    console.log(this.state.storeArray);
  };

  changeStoreName = () => {
    console.log(this.state.storeName);

    fetch(`${process.env.REACT_APP_API_SERVER_URL}/store/update`, {
      method: "PUT",
      body: JSON.stringify({
        store: {
          storeId: this.state.storeId,
          contactInfo: this.state.storeName,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.getStore();
      });
  };

  deleteStoreName = () => {
    this.setState({ storeName: "" });
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/store/delete`, {
      method: "PUT",
      body: JSON.stringify({
        store: {
          storeId: this.state.storeId,
          contactInfo: this.state.storeName,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.getStore();
      });
  };

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.contactInfo}</h1>
          <br />
          <h3>Change Store Name</h3>
          <Input
            onChange={(e) => this.setState({ storeName: e.target.value })}
          />
          <br />
          {this.state.storeName.length > 0 ? (
            <Button onClick={this.changeStoreName}>Change Name</Button>
          ) : (
            ""
          )}
          <br />
          <br />
          {this.state.contactInfo.length > 1 ? (
            <Button onClick={this.deleteStoreName}>Delete Name</Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
