import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Paginate from "react-paginate";
import queryString from "query-string";

import ItemContainer from "./ItemContainer";
import { issue_detail } from "./mock_data";
import { fetchIssues } from "./api/index";
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
        <Route exact path="/" component={IssueList} />
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

class IssueList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      exampleItems: [],
      pageOfItems: [],
      pageCount: 0,
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
  }

  handlePageChange = ({ selected }) => {
    console.log(`handlePageChange`);
  };

  componentDidMount() {
    fetchIssues()
      .then(res => {
        this.setState({
          items: res.data,
          exampleItems: res.data,
          pageOfItems: res.data,
        });
      })
      .catch(err => {
        console.log(`Axios Error`, err);
      });
  }

  componentWillReceiveProps(newProps) {
    console.log(`componentWillReceiveProps`, this);
  }

  render() {
    const { pageCount, pageOfItems } = this.state;
    const { search } = this.props.location.search;

    const params = queryString.parse(search);
    const currentPage = Math.min(
      pageCount,
      Math.max(1, parseInt(params.page, 10) || 1),
    );

    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <ItemContainer items={pageOfItems} />
            <Paginate
              forcePage={currentPage}
              pageCount={pageCount}
              nextLabel="&rarr;"
              previousLabel="&larr;"
              marginPagesDisplayed={2}
              pageRangeDisplayed={10}
              onPageChange={this.handlePageChange}
            />
            <Paginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              pageCount={pageCount}
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

// IssueList.propTypes = {
//   pageCount: PropTypes.number.isRequired,
// };

export default App;
