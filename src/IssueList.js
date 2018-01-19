import React, { Component } from "react";

import ItemContainer from "./ItemContainer";
import Paginate from "react-paginate";
import queryString from "query-string";
import * as API from "./api/index";

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

export default IssueList;
