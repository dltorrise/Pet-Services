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
            <div id="pets"></div>
        </div>
    );
}