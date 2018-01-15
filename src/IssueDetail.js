import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import CommentIssue from "./CommentIssue";

if (process.env.NODE_ENV === "development") {
  require("./IssueDetail.css");
}

const EMPTY = [];

class IssueDetail extends Component {
  createComments(comments) {
    return comments.map((v, k) => {
      return <CommentIssue key={k} data={v} />;
    });
  }

  render() {
    return (
      <div className="issue-detail">
        <h1>{this.props.issue_detail.title}</h1>
        <div className="issue-detail__meta">
          <span className="issue-detail__number">
            #{this.props.issue_detail.issue_id}
          </span>
          <span className={this.props.issue_detail.status}>
            {this.props.issue_detail.status}
          </span>
          <a href={this.props.issue_detail.author.profile_site}>
            <img
              className="issue__user__avatar"
              src={this.props.issue_detail.author.avatar}
            />
            <div className="issue__user__name">
              {this.props.issue_detail.author.name}
            </div>
          </a>
        </div>
        <div className="issue-detail__summary">
          <ReactMarkdown source={this.props.issue_detail.content} />
        </div>
        <hr />
        <div className="issue-detail__comments">
          {this.createComments(this.props.issue_detail.comments || EMPTY)}
        </div>
      </div>
    );
  }
}

export default IssueDetail;
