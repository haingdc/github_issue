import React from "react";
import date_fns, { format } from "date-fns";

if (process.env.NODE_ENV === "development") {
  require("./ItemContainer.css");
}
class ItemContainer extends React.Component {
  diffenceTime(issue_time_string) {
    const NOW = new Date();
    const issue_time = new Date(issue_time_string);
    let diff_time = date_fns.differenceInMinutes(NOW, issue_time);

    if (diff_time === 1 || diff_time === 0) {
      return `Open on 1 minute ago`;
    } else if (diff_time < 60) {
      return `Open on ${diff_time} minutes ago`;
    }

    diff_time = date_fns.differenceInHours(NOW, issue_time);
    if (diff_time === 1) {
      return "Open on 1 hour ago";
    } else if (diff_time < 24) {
      return `Open on ${diff_time} hours ago`;
    }

    diff_time = date_fns.differenceInDays(NOW, issue_time);
    if (diff_time === 1) {
      return "Open on 1 day ago";
    } else if (diff_time < 30) {
      return `Open on ${diff_time} days ago`;
    }
    return format(
      new Date(issue_time_string),
      "[Opened on ] MMM D, YYYY [by ]",
    );
  }

  render() {
    let { items } = this.props;
    if (!items) {
      items = [];
    }

    let liElements = items.map((issue, ind) => (
      <li key={ind}>
        <div className="float status">
          <span className={issue.status}>{issue.status}</span>
        </div>
        <div className="float">
          <a className="issue-item" href="#">
            {issue.title}
          </a>
          <p>{this.diffenceTime(issue.time)}</p>
        </div>
        <div className="clearfix" />
      </li>
    ));

    return (
      <div>
        <ul className="issue-list">{liElements}</ul>
      </div>
    );
  }
}

export default ItemContainer;
