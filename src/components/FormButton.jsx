import React from 'react';

const FormButton = (props) => {
  return (
    <div className={`${props.type} Button`} onClick={props.clickFunc}>
      <p id={props.type} >{props.buttonText}</p>
    </div>
  )
}

module.exports = FormButton;