import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries'
import AuthService from '../../utils/auth'
import { ADD_PET } from '../../utils/mutations'

const Profile = () => {
  // Query user data from the server
  const { loading, data } = useQuery(QUERY_USER);

  // Create a mutation function to add a new pet
  const [addPet] = useMutation(ADD_PET);

  // Initialize form state with empty values for pet information
  const [formState, setFormState] = useState({ name: '', type: '', breed: '', age: '', image: '' });

  // Update the form state as the user types into the input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit the form to add a new pet to the user's profile
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Use the addPet mutation to add the new pet to the database
      await addPet({
        variables: { ...formState },
        // Refetch the user data after adding the new pet to update the UI
        refetchQueries: [{ query: QUERY_USER }],
      });
      // Clear the form state after the new pet has been added
      setFormState({ name: '', type: '', breed: '', age: '', image: '' });
    } catch (e) {
      console.error(e);
    }
  };

  // Check if the user is logged in using the AuthService
  const loggedIn = AuthService.loggedIn();

  // If the user is not logged in, display a message to prompt them to log in
  if (!loggedIn) {
    return (
      <h2>You need to be logged in to view this page. Please log in.</h2>
    )
  }

  // If the user is logged in, display their username and list of pets
  return (
    <div>
      <h1>Welcome {data.user.username}!</h1>
      <p>Here are your registered pets:</p>
      <div id="pets">
        <ul>
          {data.user.pets.map((pet) => (
            <li key={pet._id}>
              <h3>{pet.name}</h3>
              <p>{pet.type}</p>
              <p>{pet.breed}</p>
              <p>{pet.age}</p>
              <img src={pet.image} alt={pet.name} />
            </li>
          ))}
        </ul>
      </div>
      <div id="register">
        <form onSubmit={handleFormSubmit}>
          <h3>Register a new pet!</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={handleInputChange} value={formState.name} required />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <input type="text" name="type" onChange={handleInputChange} value={formState.type} required />
          </div>
          <div>
            <label htmlFor="breed">Breed:</label>
            <input type="text" name="breed" onChange={handleInputChange} value={formState.breed} required />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input type="number" name="age" onChange={handleInputChange} value={formState.age} required />
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input type="text" name="image" onChange={handleInputChange} value={formState.image} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;