import React from "react";
import ReactMarkdown from "react-markdown";

const CommentIssue = ({ data }) => {
  return (
    <div className="issue-detail__comment__wrapper">
      <div className="issue-detail__comment">
        <div className="issue-detail__comment__meta">
          <a href={data.author.profile_site}>
            <img
              src={data.author.avatar}
              alt="helo"
              className="issue__user__avatar"
            />
            <span className="issue__user__name">{data.author.name}</span>
          </a>
        </div>
        <div className="issue-detail__comment__body">
          <ReactMarkdown source={data.content} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CommentIssue;
