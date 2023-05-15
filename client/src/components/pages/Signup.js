import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { ModalContext } from '../../App';

function Signup ( ) {

    const { showModal, setModal, switchModal, flipSwitchModal } =
    useContext(ModalContext);

    const isVisible = showModal;

    function onClose ( )  {
      setModal(false)
    };

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          role: formState.role,
          username: formState.username,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
 
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    if (!isVisible) return null ;

    const handleClose = (e) => {
      if(e.target.id === 'wrapper') onClose();
    }

    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" 
          id="wrapper"
          onClick={handleClose}
        >
          <div className="md:w-[600px] w-[90%] mx-auto flex flex-col ">

        <div className=' bg-white p-12 rounded flex flex-col' >
        <button 
          className="text-gray-900 place-self-end"
          onClick={()=> onClose()}
        >
          X
        </button>
        <div className='py-6 px-6 lg:px-8 text-left'>
        
        <div className='flex flex-row-reverse'>
                <button 
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-purple-900 underline"
                 onClick={()=> {
                    if (switchModal === false){
                      flipSwitchModal(true);
                    } else {
                      flipSwitchModal(false);
                    }
                  }} 
                >
                    <span>
                      Log In
                    </span>
                  </button>
              </ div>

        <h2
          className='mb-4 text-xl font-medium test-gray-900'
        >
          Create an account
        </h2>
        <form 
          onSubmit={handleFormSubmit}
          className='space-y-6'
        >
          <div>
            <label 
              htmlFor="username"
              className='block mb-2 text-md font-medium text-gray-900'
            >
              Username <span className=' text-red-500 '> * </span>
            </label>
            <input
              placeholder="Username"
              name="username"
              type="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="pt-1.5">
            <label 
              htmlFor="role"
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Tell us your desired role <span className=' text-red-500 '> * </span>
            </label>
            <select 
              name="role" 
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
              required
            >
              <optgroup label="role">
                <option disabled selected value> -- select an option -- </option>
                <option value="pet owner">Pet Owner</option>
                <option value="pet service worker">Pet Service Professional</option>
              </optgroup>
            </select>
          </div>
          <div className="pt-1.5">
            <label 
              htmlFor="email"
              className='block mb-2 text-md font-medium text-gray-900'
            >
              Your email <span className=' text-red-500 '> * </span>
            </label>
            <input
              placeholder="youremail@email.com"
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="pt-1.5">
            <label 
              htmlFor="pwd"
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Your Password <span className=' text-red-500 '> * </span>
            </label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
            />
          </div>
          <div className="pt-3">
            <button 
              type="submit"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Sign up
            </button>
          </div>
          {error ? (
                <div>
                <p 
                  className=' text-red-500'
                >
                  Oops! Please fill in all required fields and try again.
                </p>
                </div>
            ) : null}
        </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup;