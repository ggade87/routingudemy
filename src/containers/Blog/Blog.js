import React, { Component } from "react";
// import axios from 'axios';
import axios from "../../axios";
import Posts from "./Posts/Posts";
import "./Blog.css";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

//import NewPost from "./NewPost/NewPost";
import asynchComponent from "../../HOC/asyncComponent";
const AsyncNewPost = asynchComponent(() => {
  return import("./NewPost/NewPost");
});
class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa924f",
                    textDecoration: "underline",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost}></Route>
          ) : null}
          <Route path="/posts/" component={Posts}></Route>
          <Route render={() => <h1>Not found</h1>} />
          {/* <Redirect from="/" to="/posts/"></Redirect> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
