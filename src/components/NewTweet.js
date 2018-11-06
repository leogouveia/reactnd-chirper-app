import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from '../actions/tweets';
import { Redirect } from 'react-router-dom';

class NewTweet extends Component {
  state = {
    text: "",
    toHome: false
  };
  handleChange = e => {
    const text = e.target.value;
    this.setState(() => ({
      text
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, id: tweetId } = this.props;
    const { text } = this.state;
    dispatch(handleAddTweet(text, tweetId))
    this.setState(() => ({ text: "", toHome: tweetId ? false : true }));
  };
  render() {
    const { text, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }
    const tweetLeft = 200 - text.length;
    return (
      <div>
        <h3 className="center">Compose new tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          { tweetLeft <= 100 && (
            <div className="tweet-length">{ tweetLeft }</div>
          )}
          <button className='btn' type='submit' disabled={text === ''}>Submit</button>
        </form>
      </div>
    );
  }
}


export default connect()(NewTweet);
