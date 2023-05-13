import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    return (
      <div className="login-container">
        <div className="">
            <Link to="/signup">Go to Signup</Link>
            <Link to="/">Back to home</Link>

            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
            <div className="">
                <label htmlFor="email">Email address:</label>
                <input
                    placeholder="youremail@email.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                />
            </div>
            <div className="">
                <label htmlFor="pwd">Password:</label>
                <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                />
            </div>
            
            <div className="">
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5">
                  Submit
                </button>
            </div>
            
            {error ? (
                <div>
                <p className="error-text">Oops! Incorrect credentials. Please try again.</p>
                </div>
            ) : null}
            </form>
        </div>
      </div>
    );
}  

export default Login;
