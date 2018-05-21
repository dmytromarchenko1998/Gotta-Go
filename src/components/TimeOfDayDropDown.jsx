import React from 'react';

const TimeOfDayDropDown = (props) => { 
  return (
    <form> 
      <select>
        {props.timeOfDay.map(timeOfDay => { return <option value={timeOfDay}>{timeOfDay}</option>})}
      </select>
    </form>
  );
};

module.exports = TimeOfDayDropDown;