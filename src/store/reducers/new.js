import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  success: false, 
  error: null
}

const searchSuccess = (state, action) => {
  const updatedState = { success: action.success }

  return updateObject(state, updatedState) 
}

const searchFail = (state, action) => {
  const updatedState = { error: action.error }

  return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action)
    case actionTypes.SEARCH_FAIL: return searchFail(state, action)
    default:
      return state
  }
}

export default reducer