import { RECEIVE_TWEETS } from "../actions/tweets";

export default function loading(state = true, action) {
  switch (action.type) {
  case 'RECEIVE_TWEETS':
    return false;
  default:
    return state;
  }
}
