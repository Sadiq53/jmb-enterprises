import React, { useState, useEffect } from 'react';
// import '../../feature/Manage-Members/ToastStyle.css'; // Import the CSS file for styling

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div  className={`toast ${type}`}>
      <div className='icon-wrapper' >
        <div className='icon' ></div>
      </div>
      <div className='toast-message'>
        <h4>{message}</h4>
      </div>
      <button  className='toast-close' onClick={handleClose}></button>
      <div  className="timer timer-animation"></div>
    </div>
  );
};

export default Toast;