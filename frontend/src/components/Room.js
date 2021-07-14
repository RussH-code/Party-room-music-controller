import React, { useState, useEffect } from 'react'
import {Grid, Button, Typography} from '@material-ui/core'
import { withRouter } from "react-router";
import CreateRoomPage from './CreateRoomPage';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MusicPlayer from './MusicPlayer';

const Room = (props) => {
    const history = useHistory()
    const roomCode = props.match.params.roomCode;
    const [votesToSkip, setVotesToSkip] = useState('');
    const [guestCanPause, setGuestCanPause] = useState(''); 
    const [isHost, setIsHost] = useState('');
    const [showSettings, setShowSettings] = useState(false)
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
    const [song, setSong] = useState({})

    const authenticateSpotify = () => {
        fetch('/spotify/is-authenticated')
        .then(response => response.json())
        .then((data) => {
            setSpotifyAuthenticated(data.status);
            if(!data.status){
                fetch('/spotify/get-auth-url')
                .then((response) => response.json())
                .then((data) => {
                    window.location.replace(data.url); // redirect to the url
                })
            }
        })
    }

    const getCurrentSong = () => {
        fetch('/spotify/current-song')
        .then(response => {
            if (!response.ok){
                return {}
                window.location.reload()
            } else{
                return response.json()
            }
        })
        .then(data => {
            setSong(data)
        })
    }

    useEffect(() => {
        fetch('/api/get-room' + '?code=' + roomCode)
        .then((response) => {
            if(!response.ok){
                console.log("State: " + response.statusText)
                history.push("/")
            }
            return response.json()
        })
        .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host)
        });
    }, [])

    useEffect(() => {
        if(isHost){
            console.log('Authenticating user')
            authenticateSpotify();
        }
    }, [isHost])

    useEffect(() => {
        const interval = setInterval(getCurrentSong, 1000)
        return () => {clearInterval(interval)}
    }, [spotifyAuthenticated])

    const handleLeaveRoom = () => {
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json"}
        }
        fetch('/api/leave-room/', requestOptions)
            .then(response => {
                history.push("/")
                window.location.reload()
            }
            )
    }

    const renderSettings = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause}
                        roomCode={roomCode}                        
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => {setShowSettings(false)}}>Close Settings</Button>
                </Grid>
            </Grid>
        )
    }
    
    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => {setShowSettings(true)}}>Settings</Button>
                <br/>
            </Grid>
        )
    }

    const renderContent = () => {
        return(
            <Grid containerspacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant="h3" component="h3">Room ID: {roomCode}</Typography>
                </Grid>
                <MusicPlayer {...song}/>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={handleLeaveRoom}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }   

    if(showSettings) {
        return (
            <Grid container spacing={1} align="center">
                {renderSettings()}
            </Grid>
        )
    } else {
        return(
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    {renderContent()}  
                </Grid>
                <Grid item xs={12}>
                    {isHost && renderSettingsButton()} 
                </Grid>
            </Grid>
            )
    }
}

export default withRouter(Room);