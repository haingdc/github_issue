import React from "react";
import ReactMarkdown from "react-markdown";

const CommentIssue = ({ data }) => {
  const { user, body } = data;
  return (
    <div className="issue-detail__comment__wrapper">
      <div className="issue-detail__comment">
        <div className="issue-detail__comment__meta">
          <a href={user.html_url}>
            <img
              src={user.avatar_url}
              alt="helo"
              className="issue__user__avatar"
            />
            <span className="issue__user__name">{user.login}</span>
          </a>
        </div>
        <div className="issue-detail__comment__body">
          <ReactMarkdown source={body} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CommentIssue;
