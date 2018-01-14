import React, { Component } from "react";

if (process.env.NODE_ENV === "development") {
  require("./IssueDetail.css");
}

class Issue_Detail extends Component {
  constructor(props) {
    super(props);
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
            <div className="issue-detail__name">
              {this.props.issue_detail.author.name}
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Issue_Detail;
