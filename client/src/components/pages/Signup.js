import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          role: formState.role,
          username: formState.userame,
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

    return (
        <div className="container">
        <Link to="/login">← Go to Login</Link>
  
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="">
            <label htmlFor="username">Username:</label>
            <input
              placeholder="Username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="role">Tell us your role:</label>
            <select
              placeholder="Role"
              name="role"
              type="role"
              id="role"
              onChange={handleChange}
            >
              <option value="pet owner">Pet Owner</option>
              <option value="pet service worker">Pet Service Professional</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="email">Email:</label>
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
}

export default Signup;
