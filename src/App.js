import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import ItemContainer from "./ItemContainer";
import { issues, issue_detail } from "./mock_data";
import Pagination from "./Pagination";
import IssueDetail from "./IssueDetail";

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

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ISSUE} />
        <Route
          exact
          path="/specific-issue"
          render={props => {
            return (
              <IssueDetail {...props} issue_detail={this.props.issue_detail} />
            );
          }}
        />
        <Route
          exact
          path="/issue/:issueId"
          render={props => {
            return (
              <IssueDetail {...props} issue_detail={this.props.issue_detail} />
            );
          }}
        />
        <Redirect to="/" />
      </Switch>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      exampleItems: [],
      pageOfItems: [],
      issue_detail: {},
    };
  }

  componentWillMount() {
    this.setState({ issue_detail });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Navigation />
          <Main issue_detail={this.state.issue_detail} />
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
    const url = `https://api.github.com/repos/Microsoft/vscode/issues?per_page=25&page=1`;
    return axios
      .get(url)
      .then(res => {
        return { data: res.data };
      })
      .catch(err => Promise.reject(err));
  }

  componentDidMount() {
    // let items = this.fetchIssues();
    // this.setState({ items, exampleItems: items });

    this.fetchIssues()
      .then(res => {
        console.log(res);
        this.setState({ items: res.data, exampleItems: res.data });
      })
      .catch(err => {
        console.log(`Axios Error`, err);
      });
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
