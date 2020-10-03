import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const [selectedDate, setSelectedDate] = useState({
        checkInDate: new Date(),
        checkOutDate: new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkInDate = date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkOutDate = date;
        setSelectedDate(newDate);
    };
    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectedDate}
        fetch('http://localhost:5000/addbooking',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                console.log('Booking successfull');
            }
        })
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Welcome {loggedInUser.name}. Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate.checkInDate}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="dd/MM/yyyy"
          value={selectedDate.checkOutDate}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Button onClick={handleBooking} variant="contained" color="primary">
        Book Now!
        </Button>
    </MuiPickersUtilsProvider>
          <Bookings></Bookings>
        </div>
    );
};

export default Book;