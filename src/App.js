import React, { Component } from "react";
import _ from "underscore";
import { NavLink, Switch, Route } from "react-router-dom";

import ItemContainer from "./ItemContainer";
import { issues } from "./mock_data";
import Pagination from "./Pagination";

if (process.env.NODE_ENV === "development") {
  require("./App.css");
}

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact activeClassName="current" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/contact">
          Contact
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/contact" component={Contact} />
  </Switch>
);

const Home = () => (
  <div className="home">
    <h1>Welcome to my portfolio website</h1>
    <p> Feel free to browse around and learn more about me.</p>
  </div>
);

const About = () => (
  <div className="about">
    <h1>About Me</h1>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
  </div>
);

const Contact = () => (
  <div className="contact">
    <h1>Contact Me</h1>
    <p>
      You can reach me via email: <strong>hello@example.com</strong>
    </p>
  </div>
);
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      exampleItems: [],
      pageOfItems: [],
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems });
  }

  fetchIssues() {
    return issues;
  }

  componentDidMount() {
    let items = this.fetchIssues();
    this.setState({ items, exampleItems: items });
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Main />
        <div className="container">
          <div className="text-center">
            <ItemContainer items={this.state.pageOfItems} />
            <Pagination
              items={this.state.exampleItems}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
