import React from 'react';

const HoursDropDown = (props) => { 

  const hours = [];
  for (let i = 1; i <= 12; i += 1) {
    let hour = JSON.stringify(i);
    hours.push(hour);
  }

  return (
    <form> 
      <select default="test" id={props.openOrClosed}>
        <option value="" selected disabled hidden>Hours</option>
        {hours.map(hour => { 
          return (
            <option value={hour}>{hour}</option>
          )
        })}
      </select>
    </form>
  );
};

module.exports = HoursDropDown;