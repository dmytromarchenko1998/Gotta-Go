import React from 'react';

const RestroomEntry = (props) => {
  return (
    <div>
      <p>{props.restroom.name}</p>
      <p>{props.restroom.address}</p>
      <div className="entryHours">
        <p>{props.restroom.OpenHours}</p>
        <p>{props.restroom.OpenMins}</p>
        <p>{props.restroom.ClosedHours}</p>
        <p>{props.restroom.ClosedMins}</p>
      </div>
    </div>
  )
}

module.exports = RestroomEntry;