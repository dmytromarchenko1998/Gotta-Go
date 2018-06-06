import React from 'react';

const closeModal = (props) => {
  return (
    <span className="closeModal">
      <div onClick={props.resetForm} className="closeModalContainer">
        <p className="closeModalButton">&#10005;</p>
      </div>
    </span>
  )
}

module.exports = closeModal;