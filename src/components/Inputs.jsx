import React from 'react';

const Inputs = props => (
  <div className={`Input${props.type}Container`}>
    <p>{props.type}</p>
    <input id={`Input${props.type}`} type="text" />
  </div>
);

module.exports = Inputs;
