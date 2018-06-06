import React from 'react';
import RestroomEntry from './RestroomEntry.jsx';

const NearbyRestroomsList = (props) => {
  if (props.restrooms) {
    if (props.restrooms.length >= 1) {
      return (
        <div>
          {props.restrooms.map(restroom => {return <RestroomEntry curLat={props.curLat} curLon={props.curLon} restroom={restroom} />})}
        </div>
      )
    } else {
      return <div>no restrooms found</div>
    }
  } else {
    return <div>loading</div>
  }
}

module.exports = NearbyRestroomsList;