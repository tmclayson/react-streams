import streams from '../apis/streams';
import history from '../history'
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';
// es6 object literal return syntax
export const signIn = (userId) => ({
  type: SIGN_IN,
  payload: userId,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  // spread syntax extracts all the form values, which we then put into a new object with userId
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/'); // force redirect to the address given
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data })
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${ id }`);
  console.log('Stream Fetched: ' + response.data);
  dispatch({ type: FETCH_STREAM, payload: response.data })
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${ id }`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data })
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/:${ id }`);

  dispatch({ type: DELETE_STREAM, payload: id })
};