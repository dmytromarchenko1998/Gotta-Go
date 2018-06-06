import React from 'react';
import RestroomEntryHours from './RestroomEntryHours.jsx';

const RestroomEntry = (props) => {
  return (
    <div className="RestroomEntryContainer">
      <div className="RestroomEntry">
        <p className="RestroomEntryName">{props.restroom.name}</p>
        <p>{props.restroom.address}</p>
        <RestroomEntryHours restroom={props.restroom}/>
        </div>
    </div>
  )
}

module.exports = RestroomEntry;