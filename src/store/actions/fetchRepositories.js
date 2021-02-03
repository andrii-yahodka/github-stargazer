import * as actionTypes from './actionTypes'

import { allRepositories } from '../../shared/firebase'

export const fetchRepositories = () => {
  return dispatch => {
    dispatch( fetchRepositoriesStart() )

    allRepositories().on('value', snapshot => {
      const repositories = snapshot.val()
      let fetchedRepositories = []
      if (repositories) {
        fetchedRepositories = Object.keys(repositories).map(id => {
          return { id: id, ...repositories[id] }
        })
      }

      dispatch( fetchRepositoriesSuccess(fetchedRepositories) )
    })
  }
}

const fetchRepositoriesStart = () => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_START
  }
}

const fetchRepositoriesSuccess = (repositories) => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_SUCCESS,
    repositories: repositories
  }
}