import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
}
// desctructure the action object recieved
export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // we want to associate any streams the user creates with an Id.
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: payload };

    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null }

    default:
      return state;
  }
}
