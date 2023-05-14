import React, { useContext } from 'react';
import Signup from './Signup';
import Login from './Login';
import { ModalContext } from '../../App';

const Modal = ( ) => {

  const { switchModal } = useContext(ModalContext);

  return (
    <div>
        {!switchModal ?
            <Login /> : 
            <Signup />
        }
    </div>
  );
}

export default Modal;
