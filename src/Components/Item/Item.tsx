import React from "react";

type ItemProps = {
  userId: number,
  storeId: number
};

type ItemState = {};

export default class Item extends React.Component<ItemProps, ItemState> {
  createItems = () => {
    fetch(`http://localhost:3586/items/`, {
      method: 'POST',
      body: JSON.stringify({

      })
    })
  }  
  
  
  render() {
    return <h1>555</h1>;
  }
}

