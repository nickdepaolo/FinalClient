import React from "react";
import { Button, Input } from "reactstrap";

type ItemProps = {
  userId: number;
  storeId: number;
  sessionToken: string | null;
};

type ItemState = {
  itemName: string;
  description: string;
  itemContain: any;
  editName: string;
  editDes: string;
  itemId: number;
  searching: boolean;
};

export default class Item extends React.Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);

    this.state = {
      itemName: "",
      description: "",
      itemContain: "",
      editName: "",
      editDes: "",
      itemId: 0,
      searching: false,
    };
  }
  createItems = () => {
    fetch(`http://localhost:3586/item/`, {
      method: "POST",
      body: JSON.stringify({
        item: {
          itemName: this.state.itemName,
          description: this.state.description,
          userId: this.props.userId,
          storeId: this.props.storeId,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  deleteItems = () => {
    fetch(`http://localhost:3586/item/delete`, {
      method: "DELETE",
      body: JSON.stringify({ id: this.state.itemId }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  updateItemDes = () => {
    fetch(`http://localhost:3586/item/update`, {
      method: "PUT",
      body: JSON.stringify({
        id: this.state.itemId,
        description: this.state.editDes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  updateItemName = () => {
    fetch(`http://localhost:3586/item/update`, {
      method: "PUT",
      body: JSON.stringify({
        id: this.state.itemId,
        itemName: this.state.editName,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  stateSetter() {
    this.setState({ searching: true });
    console.log(this.state.itemContain);
  }

  componentDidMount() {
    fetch(`http://localhost:3586/item/itembyid`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ itemContain: data });
        this.stateSetter();
      });
  }

  render() {
    return (
      <div>
        <h3>Add item</h3>
        <br />
        <h5>Item Name</h5>
        <Input onChange={(e) => this.setState({ itemName: e.target.value })} />
        <br />
        <h5>Item Description</h5>
        <Input
          onChange={(e) => this.setState({ description: e.target.value })}
        />
        <br />
        <br />
        <Button onClick={this.createItems}>Add</Button>
        <br />
        {this.state.searching
          ? this.state.itemContain.map(
              (itemContain: { itemName: string; description: string }) => {
                return (
                  <div>
                    <h2>{itemContain.itemName}</h2>
                    <h4>{itemContain.description}</h4>

                    <div>
                      <Input
                        onChange={(e) =>
                          this.setState({ editName: e.target.value })
                        }
                      />
                      <br />
                      <Button>Change Item Name</Button>
                    </div>

                    <div>
                      <Input
                        onChange={(e) =>
                          this.setState({ editDes: e.target.value })
                        }
                      />
                      <br />
                      <Button>Change Item Description</Button>
                    </div>
                  </div>
                );
              }
            )
          : ""}
      </div>
    );
  }
}
