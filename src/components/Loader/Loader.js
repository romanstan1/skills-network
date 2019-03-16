import React from "react"
import PropTypes from "prop-types"

const Loader = ({failedData, fetchData}) =>
  <div className="loader">
    <div className="bubble" />
    <div className="bubble" />
    <div className="bubble" />
    <div className="bubble" />
    {
      failedData ?
        <div className="retry-button" onClick={fetchData}>RETRY?</div>
        : null
    }
  </div>


Loader.propTypes = {
  failedData: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired
}

export default Loader
