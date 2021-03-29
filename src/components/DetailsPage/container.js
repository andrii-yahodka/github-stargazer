import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../store/actions'
import { selectRepository, selectLoading, selectError } from '../../store/selectors/fetchRepositorySelector'

import Header from './Header'
import Content from './Content'
import Error from '../UI/Error'
import Layout from '../UI/Layout'
import Spinner from '../UI/Spinner'

class DetailsPage extends Component {
  componentDidMount() {
    this.props.fetchRepository(this.props.match.params.id)
  }
  
  render() {
    let content = <Spinner />
    if (this.props.error) {
      return <Error />
    }
    if (!this.props.error && !this.props.loading) {
      content = (
        <Layout 
          header={<Header repository={this.props.repository}/>} 
          body={<Content repository={this.props.repository} />} />
      )
    }

    return content
  }
}

DetailsPage.propTypes = {
  repository: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchRepository: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    repository: selectRepository(state),
    loading: selectLoading(state),
    error: selectError(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRepository: (id) => dispatch(actions.fetchRepository(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailsPage))