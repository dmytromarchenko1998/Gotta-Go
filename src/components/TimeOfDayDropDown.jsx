import React from 'react';

const TimeOfDayDropDown = (props) => { 
  return (
    <form> 
      <select id={props.openOrClosed}>
        <option value="" selected disabled hidden>AM/PM</option>
        {props.timeOfDay.map(timeOfDay => { return <option value={timeOfDay}>{timeOfDay}</option>})}
      </select>
    </form>
  );
};

module.exports = TimeOfDayDropDown;