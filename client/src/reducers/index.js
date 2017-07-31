import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './authReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
  form,
  message: messageReducer,
  auth: authReducer
})

export default rootReducer
