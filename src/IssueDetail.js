import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import CommentIssue from "./CommentIssue";
import * as API from "./api/index";
import _ from "underscore";

if (process.env.NODE_ENV === "development") {
  require("./IssueDetail.css");
}

const EMPTY = [];

class IssueDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { issue_detail: {} };
  }

  createComments(comments) {
    return comments.map((v, k) => {
      return <CommentIssue key={k} data={v} />;
    });
  }

  componentDidMount() {
    API.fetchIssue(this.props.match.params.issueId)
      .then(issue => {
        API.fetchComments(issue.comments_url)
          .then(comments => {
            this.setState({ issue_detail: issue, comments });
          })
          .catch(err => {
            console.log(`fetch comments error`, err);
          });
      })
      .catch(err => {
        console.log(`fetch issue error`, err);
      });
  }

  render() {
    if (_.isEmpty(this.state.issue_detail)) {
      return <div>Nothing to show</div>;
    }

    const {
      title,
      number,
      state,
      user,
      body,
      comments_url,
    } = this.state.issue_detail;

    const { comments } = this.state;

    return (
      <div className="issue-detail">
        <h1>{title}</h1>
        <div className="issue-detail__meta">
          <span className="issue-detail__number">#{number}</span>
          <span className={state}>{state}</span>
          <a href={user.html_url}>
            <img className="issue__user__avatar" alt="" src={user.avatar_url} />
            <div className="issue__user__name">{user.login}</div>
          </a>
        </div>
        <div className="issue-detail__summary">
          <ReactMarkdown source={body} />
        </div>
        <hr />
        <div className="issue-detail__comments">
          {this.createComments(comments || EMPTY)}
        </div>
      </div>
    );
  }
}

export default IssueDetail;
