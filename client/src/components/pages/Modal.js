import React from 'react';
import Signup from './Signup';
import Login from './Login';

const Modal = ({isVisible, onClose, flipSwitchModal, switchModal}) => {
  return (
    <div>
        {!flipSwitchModal ?
            <Login isVisible = {isVisible} onClose={onClose} flipSwitchModal={flipSwitchModal} switchModal={switchModal} /> :
            <Signup isVisible = {isVisible} onClose={onClose} flipSwitchModal={flipSwitchModal} switchModal={switchModal} />
        }
    </div>
  );
}

export default Modal;
