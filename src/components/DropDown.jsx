import React from 'react';

const DropDown = (props) => {
  let values;
  const hours = [];
  for (let i = 1; i <= 12; i += 1) {
    const hour = JSON.stringify(i);
    hours.push(hour);
  }

  const mins = [];
  for (let i = 0; i <= 60; i += 5) {
    let min = JSON.stringify(i);
    if (min.length === 1) {
      min = `0${min}`;
    }
    mins.push(min);
  }

  const timeOfDay = ['AM', 'PM'];

  if (props.type === 'Mins') {
    values = mins;
  } else if (props.type === 'Hours') {
    values = hours;
  } else {
    values = timeOfDay;
  }

  return (
    <form>
      <select id={`${props.type}${props.openOrClosed}`}>
        <option value="" selected disabled hidden>{props.time || props.type}</option>
        {values.map(value => (<option value={value}>{value}</option>))}
      </select>
    </form>
  );
};

module.exports = DropDown;
