Section 11: Multi-Page-Feeling in a Single-Page-App Routing:
Routing and SPAs:
Showing different pages to user in single page application
In this we use javascript which render part of that page as different page looks like other pages
For this we are using router package
 

 

Setting up Links:
For routing first add some link at the top of page
  <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/new-post">New Post</a>
              </li>
            </ul>
          </nav>
        </header>

Css
.Blog {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 80%;
  margin: auto;
}

.Blog ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;
}

.Blog li {
  display: inline-block;
  margin: 20px;
}

.Blog a {
  text-decoration: none;
  color: black;
}

.Blog a:hover,
.Blog a:active {
  color: #fa923f;
}

Setting up the router package:
Npm install –save react-router
To render to dom we need
Npm install –save react-router-dom
Enable routing in index.js ot app.js
In app.js
Import {BrowserRouter} from ‘react-router-dom’
Then wrap app.js jsx in 
<BrowserRouter>
	//Anthing insite this will come in routing in this case whole project
</BrowserRouter>  
Example App.js
import React, { Component } from "react";

import Blog from "./containers/Blog/Blog";
import { BrowserRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
Setting up the router package
Setting up and rendering Routes:
To keep the state we need to use Link of routing instead of normal a link
import React, { Component } from "react";
// import axios from 'axios';
import axios from "../../axios";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import "./Blog.css";
import { Route, Link } from "react-router-dom";
class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <Route path="/" exact component={Posts}></Route>
        <Route path="/new-post" exact component={NewPost}></Route>
      </div>
    );
  }
}

export default Blog;

React router send history and location object to this.props.

The withRouter HOC & Route Props:
withRouter use to get routing related props it is HOC

Absolute vs Relative paths:
Absolute path take url to correct url 
Example
.com/posts/new-post
Will redirect to path 
.com/new-post
Append this.props.match.url to path
<Link
                  to={{
                    pathname: this.props.match.url + "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </Link>
Absolute vs Relative Paths (Article)
You learned about <Link> , you learned about the to  property it uses.

The path you can use in to can be either absolute or relative. 

Absolute Paths
By default, if you just enter to="/some-path"  or to="some-path" , that's an absolute path. 

Absolute path means that it's always appended right after your domain. Therefore, both syntaxes (with and without leading slash) lead to example.com/some-path .

Relative Paths
Sometimes, you might want to create a relative path instead. This is especially useful, if your component is already loaded given a specific path (e.g. posts ) and you then want to append something to that existing path (so that you, for example, get /posts/new ).

If you're on a component loaded via /posts , to="new"  would lead to example.com/new , NOT example.com/posts/new . 

To change this behavior, you have to find out which path you're on and add the new fragment to that existing path. You can do that with the url  property of props.match :

<Link to={props.match.url + '/new'}>  will lead to example.com/posts/new  when placing this link in a component loaded on /posts . If you'd use the same <Link>  in a component loaded via /all-posts , the link would point to /all-posts/new .

There's no better or worse way of creating Link paths - choose the one you need. Sometimes, you want to ensure that you always load the same path, no matter on which path you already are => Use absolute paths in this scenario.

Use relative paths if you want to navigate relative to your existing path.

Styling the active route:
We have NavLink component in react-router-dom instead of Link NavLink ahs some auto styling set which help to set active link and all
import { Route, NavLink } from "react-router-dom";
<li>
                <NavLink
                  to="/"
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

Passing Route parameters:
To make another link then menu as link then directly warp the component with Link tag and return to route 

Passin route parametr
   <Route path="/:id" exact component={FullPost}></Route>
Retriving route parameter
componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== this.props.match.params.id)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then((response) => {
          // console.log(response);
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }

We get this.props.match.params.id because of react-router-dom
Parsing query parameter and the fragment:
Parsing Query Parameters & the Fragment
You learned how to extract route parameters (=> :id  etc). 

But how do you extract search (also referred to as "query") parameters (=> ?something=somevalue  at the end of the URL)? How do you extract the fragment (=> #something  at the end of the URL)?

Query Params:
You can pass them easily like this:

<Link to="/my-path?start=5">Go to Start</Link> 

or

<Link 
    to={{
        pathname: '/my-path',
        search: '?start=5'
    }}
    >Go to Start</Link>
React router makes it easy to get access to the search string: props.location.search .

But that will only give you something like ?start=5 

You probably want to get the key-value pair, without the ?  and the = . Here's a snippet which allows you to easily extract that information:

componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        console.log(param); // yields ['start', '5']
    }
}
URLSearchParams  is a built-in object, shipping with vanilla JavaScript. It returns an object, which exposes the entries()  method. entries()  returns an Iterator - basically a construct which can be used in a for...of...  loop (as shown above).

When looping through query.entries() , you get arrays where the first element is the key name (e.g. start ) and the second element is the assigned value (e.g. 5 ).

Fragment:
You can pass it easily like this:

<Link to="/my-path#start-position">Go to Start</Link> 

or

<Link 
    to={{
        pathname: '/my-path',
        hash: 'start-position'
    }}
    >Go to Start</Link>
React router makes it easy to extract the fragment. You can simply access props.location.hash .

Using switch to load a Single Route:
Switch wrapped around Route use to load first route which matching in list of routes later it get breaks
import { Route, NavLink, Switch } from "react-router-dom";

        <Route path="/" exact component={Posts}></Route>
        <Switch>
          <Route path="/new-post" exact component={NewPost}></Route>
          <Route path="/:id" exact component={FullPost}></Route>
        </Switch>
Navigation programmatically:
We have history object in props from react-router-dom
this.props.history.push({ pathname: "/" + id });

Additional information regarding Active Link:
Understanding Nested Routes:
Load component inside component which is also loaded by routing is called nested component.
For this just move the route component to respective component.
<Route> we can use this component anywhere in application but within the BrowserRouter component
Example
<header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
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
          <Route path="/new-post" component={NewPost}></Route>
          <Route path="/" component={Posts}></Route>
        </Switch>
      </div>


    );

Create dynamic nested routes:
Note: we have loaded data in componentDidMount which will allow code execution at load time one time if want to load again we need to load data in componentDidUpdate also.
Blog.js
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
          <Route path="/new-post" component={NewPost}></Route>
          <Route path="/posts/" component={Posts}></Route>
        </Switch>
      </div>

Posts.js
 <div>
        <section>{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        ></Route>
      </div>

FUllPosts.js
componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id != this.props.match.params.id)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then((response) => {
          // console.log(response);
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }
  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then((response) => {
      console.log(response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

Rendering Request:
Use Redirect component from react-router-dom to redirect one path to other 
Bellow ‘/’ redirect to ‘/posts/
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
<Switch>
          <Route path="/new-post" component={NewPost}></Route>
          <Route path="/posts/" component={Posts}></Route>
          <Redirect from="/" to="/posts/"></Redirect>
        </Switch>
Conditional redirect:
Conditional redirect use when we submit form and navigate to display page
Just add <Redirect to=’’ /> component based on submit condition
import { Redirect } from "react-router-dom";
 postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };
    axios.post("/posts", data).then((response) => {
      console.log(response);
      this.setState({ isSubmited: true });
    });
  };

  render() {
    let redirect = null;
    if (this.state.isSubmited) {
      redirect = <Redirect to="/posts" />;
    }
    return (
      <div className="NewPost">
        {redirect}
 <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;

Using the history Prop to Redirect (Replace)
We can redirect after submitted to display page usding this.props.history.push() also but once we click back button we go baback form page to prevent this use
This.props.history.replace(‘/posts’)

Working with Guards:
Guards are use to know whether user is authenticated or not.	
It use to allows users access to particular user using state we can do this:
  <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={NewPost}></Route>
          ) : null}
          <Route path="/posts/" component={Posts}></Route>
          <Redirect from="/" to="/posts/"></Redirect>
        </Switch>
Or we can use history in componentDidMount
This.props.history.repace(‘/posts’)

Handling the 404 case (Unknown Routes)
We can add one new Route with render and not path
Example:
  <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={NewPost}></Route>
          ) : null}
          <Route path="/posts/" component={Posts}></Route>
          <Route render={() => <h1>Not found</h1>} />
          {/* <Redirect from="/" to="/posts/"></Redirect> */}
        </Switch>
Loading Rotes Lazily
Technic of loading what we need only is called lazy loading. For this we HOC.
Example
Add HOC
asyncComponednt.js
import React, { Comonent, Component } from "react";

const asyncComponednt = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponednt;

Blog.js
import asynchComponent from "../../HOC/asyncComponent";
const AsyncNewPost = asynchComponent(() => {
  return import("./NewPost/NewPost");
});

...
  <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost}></Route>
          ) : null}
          <Route path="/posts/" component={Posts}></Route>
          <Route render={() => <h1>Not found</h1>} />
          {/* <Redirect from="/" to="/posts/"></Redirect> */}
        </Switch>


Lazy loading with react suspense:
We can load any component when we required it suing react.Lazy() which has dynamic import and return component variable 
Import {Suspense} from ‘react-router-dom’
Const Posts = React.lazy(() =>impoer(‘./component/posts’))
<Route path=’/posts’ render ={() => {
	<Suspense fallback={<div>..Loading</div>}>
		<Posts />
              </Suspense>
}}

Routing and server deployment:
 

<Browserrouter basename=’my-app’>
…
</Browserrouter>

