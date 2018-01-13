import React from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

if (process.env.NODE_ENV === "development") {
  require("./ItemContainer.css");
}
class ItemContainer extends React.Component {
  render() {
    let d = format(new Date(), "[Today is a] dddd");
    let items = this.props.items.map((issue, ind) => (
      <li key={ind}>
        <div className="float status">
          <span className={issue.status}>{issue.status}</span>
        </div>
        <div className="float">
          <a className="issue-item" href="#">
            {issue.title}
          </a>
          <p>
            {format(new Date(issue.time), "[Opened on ] MMM D, YYYY [by ]")}
          </p>
        </div>
        <div className="clearfix" />
      </li>
    ));

    return (
      <div>
        <ul className="issue-list">{items}</ul>
      </div>
    );
  }
}

export default ItemContainer;
