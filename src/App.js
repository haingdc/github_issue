import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { issue_detail } from "./mock_data";

import IssueList from "./IssueList";
import IssueDetail from "./IssueDetail";

if (process.env.NODE_ENV === "development") {
  require("./App.css");
}

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={() => <Redirect to="/microsoft/vscode/issues" />}
        />
        <Route
          exact
          path="/specific-issue"
          render={props => {
            return (
              <IssueDetail {...props} issue_detail={this.props.issue_detail} />
            );
          }}
        />
        <Route exact path="/microsoft/vscode/issues" component={IssueList}>
          {/* <Route exact="/:org/:repo/issues"> */}
        </Route>
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
          <Main issue_detail={this.state.issue_detail} />
        </div>
      </div>
    );
  }
}

export default App;
