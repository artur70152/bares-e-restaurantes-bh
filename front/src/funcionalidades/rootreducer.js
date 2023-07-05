import { combineReducers } from 'redux';
import authReducer from './reducer';
import userReducer from './userreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user:userReducer
});

export default rootReducer;