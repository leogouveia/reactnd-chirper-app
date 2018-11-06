/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import ConnectedTweetList from "./TweetList";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import TweetList from "./TweetList";

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.any
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={TweetList} />
                <Route path="/new" component={NewTweet} />
                <Route path="/tweet/:id" component={TweetPage} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect(({ authedUser }) => ({ loading: authedUser === null }))(
  App
);
