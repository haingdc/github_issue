import React from "react";

class ItemContainer extends React.Component {
  render() {
    let items = this.props.items.map((val, ind) => <li key={ind}>{val}</li>);
    // console.log(items);
    return (
      <div>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default ItemContainer;
