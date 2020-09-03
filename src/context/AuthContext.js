import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signup':
      return { errorMessage: '', token: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload.token, name: action.payload.name };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const name = await AsyncStorage.getItem('name');
  if (token) {
    dispatch({ type: 'signin', payload: { token, name } });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

//condensing to implicit return in arrow function
/* const add = (a, b) => {
  return a + b;
} */
//condensed arrow function
//const add = (a, b) => a + b;

const signup = (dispatch) => async ({ name, email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { name, email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signup', payload: response.data.token });

    navigate('TrackList');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signin', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('name', response.data.name);
      dispatch({ type: 'signin', payload: response.data });

      navigate('TrackList');
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Invalid email or password' });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
