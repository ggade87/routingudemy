import React from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Link, Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
class Posts extends React.Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch((error) => {
        // console.log(error);
        // this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    this.props.history.push({ pathname: "/posts/" + id });
    //  this.setState({ selectedPostId: id });
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            title={post.title}
            author={post.author}
            id={post.id}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return (
      <div>
        <section>{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        ></Route>
      </div>
    );
  }
}

export default Posts;
