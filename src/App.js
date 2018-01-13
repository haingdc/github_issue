import React, { Component } from "react";

import ItemContainer from "./ItemContainer";
import { issues } from "./mock_data";
import Pagination from "./Pagination";
import _ from "underscore";

if (process.env.NODE_ENV === "development") {
  require("./App.css");
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      exampleItems: [],
      pageOfItems: [],
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems });
  }

  fetchIssues() {
    return issues;
  }

  componentDidMount() {
    let items = this.fetchIssues();
    this.setState({ items, exampleItems: items });
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
        <div className="container">
          <div className="text-center">
            <ItemContainer items={this.state.pageOfItems} />
            <Pagination
              items={this.state.exampleItems}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
