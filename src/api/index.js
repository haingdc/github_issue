import axios from "axios";
import parseLink from "parse-link-header";

const isLastPage = pageLinks => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  );
};

const getPageCount = pageLinks => {
  if (!pageLinks) {
    return 0;
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  } else {
    return 0;
  }
};

export const fetchIssues = () => {
  const url = `https://api.github.com/repos/Microsoft/vscode/issues?per_page=25&page=1`;
  return axios
    .get(url)
    .then(res => {
      const pageLinks = parseLink(res.headers.link);
      const pageCount = getPageCount(pageLinks);
      return {
        data: res.data,
        pageCount,
      };
    })
    .catch(err => Promise.reject(err));
};
