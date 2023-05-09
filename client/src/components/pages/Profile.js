import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_PET, } from '../../utils/queries'
import AuthService from '../../utils/auth'
console.log(AuthService)

export default function Profile() {
    //will go out to schema folder in server
    const { loading, data } = useQuery(QUERY_USER); //makes data = user
    console.log('data in profile.js file: ' + data)
    return (
        <div>
            <h1>Welcome {data.user.username}!</h1>
            <p>Here are your registered pets:</p>
            {/* possibly later we will also add past services for each pet */}
            <div id="pets">
                <ul>
                    {
                        data.user.pets.map((pet) => (
                            <li key={pet.name}>
                                <h3>{pet.name}</h3>
                                <p>{pet.type}</p>
                                <p>{pet.breed}</p>
                                <p>{pet.age}</p>
                                <img href={pet.image} />
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div id="register">
                <button>Register a new pet!</button>
            </div>
        </div>
    );
}