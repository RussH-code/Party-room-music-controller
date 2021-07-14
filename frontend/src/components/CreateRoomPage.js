import React, { useState, useEffect } from 'react';
import { FormHelperText, TextField, 
    Typography, Grid, Button, FormControl, 
    Radio, RadioGroup, FormControlLabel, Collapse } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { green, purple } from '@material-ui/core/colors'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom";
import { Alert } from '@material-ui/lab'


const CreateRoomPage = (props) => {
  let history = useHistory();
  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause)
  const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip)
  const title = props.update ? "Update Room" : "Create Room"

  const handleVotesChange = (event) =>{
      setVotesToSkip(event.target.value)
  }

  const handleGuestCanPause = (event) => {
      setGuestCanPause(event.target.value === 'true' ? true : false)
  }

  const handleClickButton = () => {
      const requestOptions = {
          method: 'POST',
          headers: {"Content-type" : "application/json"},
          body: JSON.stringify({
              votes_to_skip: votesToSkip,
              guest_can_pause: guestCanPause
          }),
      };
      fetch('/api/create-room/', requestOptions)
      .then((response) => response.json())
      .then((data) => history.push('/room/' + data.code));
  }

  const renderCreateButton = () => {
    return (
      <ThemeProvider theme={theme}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickButton}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </ThemeProvider>
    )
  }

  const handleUpdateButton = () => {
    const requestOptions = {
          method: 'PATCH',
          headers: {"Content-type" : "application/json"},
          body: JSON.stringify({
              votes_to_skip: votesToSkip,
              guest_can_pause: guestCanPause,
              code: props.roomCode
          }),
      };
      fetch('/api/update-room/', requestOptions)
      .then((response) => {
        if(response.ok){
          console.log("Successfully updated room details")
        }
        window.location.reload(false);
      })
  }

  const renderUpdateButton = () => {
    return (
      <ThemeProvider theme={theme}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdateButton}
          >
            Update Room
          </Button>
        </Grid>
      </ThemeProvider>
    )    
  }

  const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: purple
    },
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          { title }
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={handleGuestCanPause}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {props.update ? renderUpdateButton() : renderCreateButton()}
    </Grid>);
}

export default CreateRoomPage;