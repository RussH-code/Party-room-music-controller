import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from './Room';

const HomePage = (props) => {
    const [roomCode, setRoomCode] = useState(null)

    useEffect(() => {
        fetch('/api/user-in-room/')
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code)
            })
    }, [])

    const renderHomePage = () => {
        return(
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography variant="h3" component="h3">House Party Music</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                        <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/'>{roomCode ? <Redirect to={`/room/${roomCode}`} /> : renderHomePage()}</Route>
            <Route path='/join' component={RoomJoinPage} />
            <Route path='/create'>
                <CreateRoomPage 
                    update={false} 
                    votesToSkip={2}
                    guestCanPause={true}
                />
            </Route>
            <Route path='/room/:roomCode' component={Room} />
        </Switch>
    </BrowserRouter>)
}

export default HomePage;