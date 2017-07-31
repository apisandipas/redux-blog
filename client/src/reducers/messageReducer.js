import { FETCH_MESSAGE } from '../actions/types'

function messageReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_MESSAGE:
      return { ...state, message: action.payload }
    default: 
      return state
  }
}

export default messageReducer
