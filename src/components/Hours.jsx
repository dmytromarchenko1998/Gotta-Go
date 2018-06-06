import React from 'react';
import DropDown from './DropDown.jsx';

const Hours = (props) => { 
  let time;
  if (props.openOrClosed === 'Closed') {
    time = 'Closing Hours';
  } else {
    time = "Opening Hours"
  }
  return ( 
    <div>
      <div>
        <p>{time}</p>
      </div>
      <div>
        <DropDown openOrClosed={props.openOrClosed} type='Hours'/>
        <DropDown openOrClosed={props.openOrClosed} type='Mins'/>
        <DropDown openOrClosed={props.openOrClosed} type='Time' time="AM/PM"/>
      </div>

    </div>
  );
};

module.exports = Hours;