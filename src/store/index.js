import { createStore, applyMiddleware, compose } from 'redux'
import { createLogicMiddleware } from 'redux-logic'

import axios from 'axios'
import { firebase } from '../config/firebase'

import rootReducer from './reducers'
import logic from './logic'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

axios.defaults.baseURL = 'https://api.github.com/repos'

const dependencies = {
  axios: axios,
  firebase: firebase
}

const logicMiddleware = createLogicMiddleware(logic, dependencies)

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(logicMiddleware)
))

export default store
