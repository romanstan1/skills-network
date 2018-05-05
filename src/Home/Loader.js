import React from 'react';

const Loader = ({failedData, fetchData}) =>
  <div className="loader">
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    {
      failedData?
      <div className='retry-button' onClick={fetchData}>RETRY?</div>
      : null
    }
  </div>


export default Loader
