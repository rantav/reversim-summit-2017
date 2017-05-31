import * as types from '../types';

export default (state = {
  proposals: [],
  accepted: [],
  speakers: [],
  currentProposal: undefined
}, action) => {
  if (action.type === types.REQUEST_SUCCESS) {
    if (action.data) {
      return Object.assign({}, state, {
        proposals: action.data,
        accepted: action.data.filter(proposal => proposal.status === 'accepted')
      });
    }
    return state;
  }

  return state;
}