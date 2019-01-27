import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types';

const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // state is an object containing key value pairs. we want an object, containing pairs of key: objects
    // the ... before mapKeys, takes the key: object pairs from the object created, and exracts them into the new state object
    // we return the original state because:
    // 1. Not to lose state properties that may be added later;
    // 2. In case you add intermediate steps(edited but not commited streams), not to lose them;
    // 3. In case you are working on a team, having a central place(state) to rule out conflicts.
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(payload, 'id') };

    case FETCH_STREAM:
      return { ...state, [payload.id]: payload };

    case CREATE_STREAM:
      return { ...state, [payload.id]: payload };

    case EDIT_STREAM:
      return { ...state, [payload.id]: payload };
    // when we dispatch a delete action, the payload is the id itself.
    case DELETE_STREAM:
      return _.omit(state, payload);

    default:
      return state;
  }
}
