import React, { Component } from "react";

import ItemContainer from "./ItemContainer";

if (process.env.NODE_ENV === "development") {
  require("./App.css");
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  fetchIssues() {
    let items = ["item 1", "item 2", "item 3", "item 4"];
    return items;
  }

  componentDidMount() {
    let items = this.fetchIssues();
    this.setState({ items });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ItemContainer items={this.state.items} />
      </div>
    );
  }
}

export default App;
