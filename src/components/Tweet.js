import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatTweet } from "../utils/helpers";
import { handleToggleLikeTweet } from "../actions/tweets";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from "react-icons/ti";
import { Link, withRouter } from "react-router-dom";

export class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`)
    //TODO: go to tweet
  };
  handleLike = e => {
    e.preventDefault();
    //TODO when liked this tweet
    const {
      dispatch,
      tweet: { id, hasLiked },
      authedUser
    } = this.props;

    dispatch(
      handleToggleLikeTweet({ id, authedUser: authedUser.id, hasLiked })
    );
  };
  render() {
    const { tweet, authedUser } = this.props;
    if (tweet === null) {
      return <p>This tweet doesn't exists</p>;
    }

    return (
      <Link to={`/tweet/${tweet.id}`} className="tweet">
        <img className="avatar" src={tweet.avatar} alt={tweet.name} />
        <div className="tweet-info">
          <div>
            <span>{tweet.name}</span>
            <div>{formatDate(tweet.timestamp)}</div>
            {tweet.parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, tweet.parent.id)}
              >
                Replying to @{tweet.parent.author}
              </button>
            )}
            <p>{tweet.text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{tweet.replies !== 0 && tweet.replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {tweet.hasLiked ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{tweet.likes !== 0 && tweet.likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}
export default withRouter(connect(({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const author = users[tweet.author];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser: users[authedUser],
    tweet: tweet ? formatTweet(tweet, author, authedUser, parentTweet) : null
  };
})(Tweet));
