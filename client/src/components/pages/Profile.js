import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries'
import AuthService from '../../utils/auth'
import { ADD_PET, REMOVE_PET } from '../../utils/mutations'
import errorImage from '../../assets/404-bark.jpg'
import { Link } from 'react-router-dom';

const Profile = () => {
  // Query user data from the server
  const { loading, data } = useQuery(QUERY_USER);

   const [ removePet ] = useMutation(REMOVE_PET);

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

  // function accepts pet's name and deletes pet from database
  const handleRemovePet = async (name) => {
    try {
      const { data } = await removePet({
        variables: { name },
        refetchQueries: [{ query: QUERY_USER }],
      });

    } catch (err) {
      console.error(err);
    }
  };

  // Check if the user is logged in using the AuthService
  const loggedIn = AuthService.loggedIn();

  // If the user is not logged in, display a message to prompt them to log in
  if (!loggedIn) {
    return (
      <div className="error-message">
        <h2>You need to be logged in to view this page. Please log in.</h2>
        <img src={errorImage} alt="404 Error" />
        <div className="button-container">
          <a href="/" className="button">Home</a>
          <a href="/login" className="button">Login</a>
        </div>
      </div>
    )
  }
  
  // If the user is logged in and the data is still loading, display a loading message
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Otherwise, display the user's username and list of pets
  const { user } = data;
  return (
    <div id="profile-page">
      <Link to="/" id="home-button-profile">	&lt;-- Back to Home</Link>
      <Link to="/cart" id="cart-button-profile">	Go to your Cart --&gt;</Link>
      <h1 id="title-profile">Welcome {user.username}!</h1>
      <div id="pets">
      <p class="cuddly-friends">Here are your cuddly friends!🐶:</p>
      <div>
        <ul>
          {user.pets.map((pet) => (
            <li key={pet._id}>
              <h3>Name: {pet.name.toUpperCase()}</h3>
              <p>Type: {pet.type.toUpperCase()}</p>
              <p>Breed: {pet.breed.toUpperCase()}</p>
              <p>Age: {pet.age}</p>
              {/* <img src={pet.image} alt={pet.name} /> */}
              <button type='submit' id="remove-button" onClick={() => handleRemovePet(pet.name)}>
                    Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div id="register">
        <form onSubmit={handleFormSubmit}>
          <h3>Register a new pet!</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={handleInputChange} value={formState.name} placeholder="Your pet's name" required />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <input type="text" name="type" onChange={handleInputChange} value={formState.type} placeholder="Cat" required />
          </div>
          <div>
            <label htmlFor="breed">Breed:</label>
            <input type="text" name="breed" onChange={handleInputChange} value={formState.breed} placeholder="Siamese" required />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input type="number" name="age" onChange={handleInputChange} value={formState.age} required />
          </div>
          {/* <div>
            <label htmlFor="image">Image URL:</label>
            <input type="text" name="image" onChange={handleInputChange} value={formState.image} />
          </div> */}
          <button id="register-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;