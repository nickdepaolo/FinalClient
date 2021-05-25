import React from "react";
import { Button, Input, Row, Col } from "reactstrap";

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
  storeId: number;
  rerender: number
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
      storeId: 0,
      rerender: 0
    };
  }

  createItems = () => {
    console.log(this.props);

    
    fetch(`http://localhost:3586/item/`, {
      method: "POST",
      body: JSON.stringify({
        item: {
          itemName: this.state.itemName,
          description: this.state.description,
          userId: this.props.userId,
          storeId: this.state.storeId,
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
        this.checkItems();
      });
  };

  deleteItems = (id: number) => {
    fetch(`http://localhost:3586/item/delete`, {
      method: "DELETE",
      body: JSON.stringify({ item:  {
        itemId: id
      } }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.checkItems();
      });
  };

  updateItemDes = (id: number) => {
    fetch(`http://localhost:3586/item/update2`, {
      method: "PUT",
      body: JSON.stringify({
        item: {itemId: id,
        description: this.state.editDes}
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.checkItems();
      });
  };

  fetchAgain(){
    fetch(`http://localhost:3586/store/mystore`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ storeId: data.id });
        console.log(this.state.storeId);
      });
  }

  updateItemName = (id: number) => {
    fetch(`http://localhost:3586/item/update`, {
      method: "PUT",
      body: JSON.stringify({
        item: {itemId: id, 
        itemName: this.state.editName}
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.checkItems();
      });
      
  };

  stateSetter() {
    this.setState({ searching: true });
    console.log(this.state.itemContain);
  }

  componentDidMount() {
    console.log("fetch");
    
    fetch(`http://localhost:3586/store/mystore`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ storeId: data.id });
        console.log(this.state.storeId);
      });
  }

  checkItems = () => {
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
  };

  render() {
    return (
      <div>
        <h3>Add item</h3>

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
        <Button onClick={this.checkItems}>Get My Items</Button>
        <Row>
          <Col>
            {this.state.searching
              ? this.state.itemContain.map(
                  (
                    itemContain: {
                      itemName: string;
                      description: string;
                      id: number;
                    },
                    itemId: number
                  ) => {
                    return (
                      <div key={itemId}>
                        <h2>{itemContain.itemName}</h2>
                        <h4>{itemContain.description}</h4>

                        <div>
                          <Input
                            onChange={(e) =>
                              this.setState({ editName: e.target.value })
                            }
                          />
                          <br />

                          <Button
                            onClick={() => this.updateItemName(itemContain.id)}
                          >
                            Change Item Name
                          </Button>
                        </div>
                        <br />

                        <div>
                          <Input
                            onChange={(e) =>
                              this.setState({ editDes: e.target.value })
                            }
                          />

                          <br />
                          <Button 
                          onClick={() => this.updateItemDes(itemContain.id)}
                          >
                            Change Item Description
                          </Button>
                          <br />
                          <br />
                          <Button onClick={() =>this.deleteItems(itemContain.id)}>Delete</Button>
                        </div>
                      </div>
                    );
                  }
                )
              : ""}
          </Col>
        </Row>
      </div>
    );
  }
}
