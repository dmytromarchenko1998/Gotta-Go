import React from 'react';

const RestroomEntryHours = (props) => {
  if (!props.restroom.OpenHours) {
    return (
      <div className="entryHoursContainer">
        <p>No hours available</p>
      </div>
    );
  }
  return (
    <div className="entryHoursContainer">
      <p>Opens From</p>
      <p>{`${props.restroom.OpenHours}:${props.restroom.OpenMins} ${props.restroom.OpenTimeOfDay}`}</p>
      <p>To</p>
      <p>{`${props.restroom.ClosedHours}:${props.restroom.ClosedMins} ${props.restroom.ClosedTimeOfDay}`}</p>
    </div>
  );
};

module.exports = RestroomEntryHours;
