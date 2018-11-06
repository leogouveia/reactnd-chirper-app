import React from "react";
import Tweet from "./Tweet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Object } from "core-js";

class TweetList extends React.Component {
  static propTypes = {
    tweetIds: PropTypes.array
  };
  render() {
    const { tweetIds } = this.props;
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="tweet-list">
          {tweetIds.map(id => {
            return (
              <li key={id}>
                <Tweet id={id} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(({ tweets }) => ({ tweetIds: Object.keys(tweets) }))(
  TweetList
);
