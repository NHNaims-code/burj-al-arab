import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-type': 'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}` 
            }
        
        })
        .then(response => response.json())
        .then(result => {
            setBookings(result)
        })
    }, [])

    return (
        <div>
            <h1>You have {bookings.length} booking.</h1>
            {
                bookings.map(book => <li>Name: {book.name} Email: {book.email}</li>)
            }
        </div>
    );
};

export default Bookings;