import React from 'react'
import { Grid, Typography, Card, IconButton, LinearProgress } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PauseIcon from '@material-ui/icons/Pause' 

const MusicPlayer = (props) => {
    const songProgress = (props.time/props.duration)*100

    const handlePauseSong = () => {
        const requestOptions = {
            method: 'PUT',
            header: {'content-type': 'application/json'},
        }
        fetch('/spotify/pause', requestOptions)
    }

    const handlePlaySong = () => {
        const requestOptions = {
            method: 'PUT',
            header: {'content-type': 'application/json'},
        }
        fetch('/spotify/play', requestOptions)
    }

    const handleSkipSong = () => {
        const requestOptions = {
            method: 'POST',
            header: {'content-type': 'application/json'},
        }
        fetch('/spotify/skip', requestOptions)
    } 

    return(
        <Card>
            <Grid container alignItems="center">
                <Grid item xs={4} align="center">
                    <img src={props.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item xs={8} align="center">
                    <Typography component="h5" variant="h5">{props.title}</Typography>
                    <Typography color="textSecondary" variant="subtitle1">{props.artist}</Typography>
                    <div>
                        <IconButton onClick={() => {props.is_playing ? handlePauseSong() : handlePlaySong() }}>
                            {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton onClick={handleSkipSong}>
                            {props.votes}/{props.votes_required}
                            <SkipNextIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress}></LinearProgress>
        </Card>
    )
}


export default MusicPlayer;