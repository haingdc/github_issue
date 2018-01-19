import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Paginate from "react-paginate";
import queryString from "query-string";

import ItemContainer from "./ItemContainer";
import { issue_detail } from "./mock_data";
import * as API from "./api/index";
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
          <Navigation />
          <Main issue_detail={this.state.issue_detail} />
        </div>
      </div>
    );
  }
}

class IssueList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      exampleItems: [],
      issues: [],
      pageCount: 0,
    };
  }

  getIssues = ({ page }) => {
    API.fetchIssues(page)
      .then(res => {
        this.setState({
          issues: res.issues,
          pageCount: res.pageCount,
          exampleItems: res.issues,
          pageOfItems: res.issues,
        });
      })
      .catch(err => {
        console.log(`Axios Error`, err);
      });
  };

  handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    this.props.history.push({
      pathname: "/microsoft/vscode/issues",
      search: `?page=${newPage}`,
    });
  };

  componentWillReceiveProps(newProps) {
    let { search } = this.props.location;

    const page = queryString.parse(search).page;

    search = newProps.location.search;
    const newPage = queryString.parse(search).page;

    if (newPage && newPage !== page) {
      this.getIssues({ page: newPage });
    }
  }

  componentDidMount() {
    const { pageCount } = this.state;
    const { search } = this.props.location.search;

    const params = queryString.parse(search);
    const currentPage = Math.min(
      pageCount,
      Math.max(1, parseInt(params.page, 10) || 1),
    );

    this.getIssues({ page: currentPage });
  }

  render() {
    const { pageCount, issues } = this.state;
    const { search } = this.props.location.search;

    const params = queryString.parse(search);
    const currentPage =
      Math.min(pageCount, Math.max(1, parseInt(params.page, 10) || 1)) - 1;

    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <ItemContainer items={issues} />
            <Paginate
              forcePage={currentPage}
              pageCount={pageCount}
              nextLabel="&rarr;"
              previousLabel="&larr;"
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
