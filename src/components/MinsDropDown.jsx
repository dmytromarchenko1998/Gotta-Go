import React from 'react';

const MinsDropDown = (props) => { 
  
  const mins = [];
  for (let i = 0; i <= 60; i += 5) {
    let min = JSON.stringify(i);
    if (min.length === 1) {
      min = '0' + min;
    }
    mins.push(min);
  }

  return (
    <form> 
      <select id={props.openOrClosed}>
         <option value="" selected disabled hidden>Mins</option>
        {mins.map(min => { return <option value={min}>{min}</option> })}
      </select>
    </form>
  );
};

module.exports = MinsDropDown;