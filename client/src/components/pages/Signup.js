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
      console.log(name);
      console.log(value);
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
          <div className="md:w-[600px] w-[90%] mx-auto flex flex-col sm:w-[100px] sm:w=h-[100px]">

        <div className=' bg-white p-12 rounded flex flex-col' >
        <button 
          className="text-gray-900 place-self-end"
          onClick={()=> onClose()}
        >
          X
        </button>
        <div className='py-6 px-6 lg:px-8 text-left'>
            
        <h3 
          className='pb-3'
        >
                Already a user? Please log in instead!
        </h3>

        <button 
          onClick={()=> {
            if (switchModal === false){
              flipSwitchModal(true);
            } else {
              flipSwitchModal(false);
            }
          }}
        >
          Switch
        </button>

        <h2
          className='mb-4 text-xl font-medium test-gray-900'
        >
          Create an account
        </h2>
        <form 
          onSubmit={handleFormSubmit}
          className='space-y-6 sm:space-y-1'
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
              className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
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