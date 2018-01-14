import React, { Component } from "react";
import _ from "underscore";
import { NavLink, Switch, Route } from "react-router-dom";

import ItemContainer from "./ItemContainer";
import { issues } from "./mock_data";
import Pagination from "./Pagination";
import Issue_Detail from "./Issue_Detail";

if (process.env.NODE_ENV === "development") {
  require("./App.css");
}

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact activeClassName="current" to="/">
          All Issues
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/specific-issue">
          Specific Issue
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={ISSUE} />
    <Route exact path="/specific-issue" component={Issue_Detail} />
  </Switch>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Navigation />
          <Main />
        </div>
      </div>
    );
  }
}

class ISSUE extends Component {
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
