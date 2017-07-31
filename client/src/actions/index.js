import axios from 'axios'
import { browserHistory } from 'react-router-dom'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types'

const ROOT_URL = 'http://localhost:3050'

export function signInUser ({email, password}) {
  return function (dispatch) {
    // Submit Email/Password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good,
        // - update state to indicate use is authenticate
        dispatch({ type: AUTH_USER })
        // - save JWT token
        localStorage.setItem('token', response.data.token)
        // - redirect to route '/feature'
        browserHistory.push('/feature')
      })
      .catch(() => {
        // If request is bad
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      })

  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signOutUser () {
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}

export function signUpUser ({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        console.log('response', response)
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature')
      })
      .catch((response) => {
        console.log('error', response)
        dispatch(authError('Sorry, something went wrong'))
      })
  }
}

export function fetchMessage () {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}