import * as types from '../types';

const initialState = {
  reversim: []
};

export default (state = initialState, action = {}) => {
  if (action.type === types.GET_REVERSIM_TWEETS_SUCCESS) {
    return {
      reversim: action.tweets ? action.tweets.slice(0) : []
    };
  }

  if (action.type === types.REQUEST_SUCCESS) {
    return {
      reversim: []
    };
  }

  return state;
};
