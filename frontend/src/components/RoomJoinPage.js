import React, {useState} from 'react';
import { TextField, Typography, Grid, Button } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

const RoomJoinPage = (props) => {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');

    const handleRoomCodeInput = (event) => {
        setRoomCode(event.target.value)
    }

    const handleRoomJoinButton = () => {
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({
                code: roomCode
            }),
        };
        fetch('/api/join-room/', requestOptions)
        .then((response) => {
            if (response.ok) {
                props.history.push(`/room/${roomCode}`)
            } else{
                setError("Room not found.")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const theme = createMuiTheme({
        palette: {
          primary: green,
          secondary: purple
        },
      });

    return (
        <Grid container spacing={3} justify="center">
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                    error={error} 
                    label="Code" 
                    placeholder="Enter a Room Code" 
                    value={roomCode}
                    helperText={error}
                    variant="filled"
                    onChange={handleRoomCodeInput}
                >

                </TextField>
            </Grid>
                <ThemeProvider theme={theme}>
                    <Grid item xs={1.5}>
                        <Button variant="contained" color="primary" onClick={handleRoomJoinButton}>Enter Room Code</Button>
                    </Grid>
                    <Grid item xs={1.5}>
                        <Button variant="contained" color="secondary" to="/" component={Link}>Go Back</Button>
                    </Grid>
                </ThemeProvider>
        </Grid>
    )
}

export default RoomJoinPage;