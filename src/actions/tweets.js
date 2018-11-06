import * as API from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_LIKE_TWEET = 'TOGGLE_LIKE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  }
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return API.saveTweet({ text, author: authedUser, replyingTo })
      .then(tweet => {dispatch(addTweet(tweet))})
      .catch((err) => {
        console.error(err);
        alert('There was an error. Try again.');
      })
      .finally(() => dispatch(hideLoading()))
  }
     
  
}

function toggleLikeTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_LIKE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}
export function handleToggleLikeTweet(info) {
  return dispatch => {
    dispatch(toggleLikeTweet(info));
    API.saveLikeToggle(info).catch((e) => {
      console.warn('Error in handleToggleLikeTweet: ', e);

      dispatch(toggleLikeTweet(info));
      alert('Ocorreu um erro ao curtir o tweet. Tente novamente.')
    })
  }
}