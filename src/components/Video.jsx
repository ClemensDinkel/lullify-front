import ReactPlayer from 'react-player/lazy'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Button from '@material-ui/core/Button'
/* 
const useStyles = makeStyles({
    playerWrapper : {
        width: "100%",
        position: "relative"
    },

    controlWrappers: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1
    }
}) */


const Video = ({video}) => {

    return (
        <>
             <ReactPlayer
            className='react-player'
            url={video[0].video_url}
            muted={false}
            width='60%'
            /> 
           
             {/*  <Container >
                <div className={classes.playerWrapper}>
               
                </div>

                <div className={classes.controlWrappers}>
                    <Grid 
                    container 
                    direction="row" 
                    alignItems="center" 
                    justify="space-between"
                    style={{padding:16}}>
                        <Grid item>
                            <Typography variant="h5" style={{color: "white"}} >
                                {video[0].title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" startIcon={<BookmarkIcon/>}>
                                Bookmark
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container> */} 
        </>
    )
}

export default Video