import React from 'react'
import Navbar from './Navbar'
import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import { deepOrange, grey, orange } from '@mui/material/colors'
import dp from '../assets/ramen.jpg'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function Profile() {
        return (
                <Grid sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'fixed'
                }}>
                        <Navbar buttonName='logout'></Navbar>
                        <Grid sx={{
                                width: '100%',
                                height: '100vh',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                bgcolor: deepOrange[50]
                        }} container>
                                <Grid sx={{
                                        width: '75%',
                                        height: '80%',
                                        borderRadius: '30px'
                                }} container>
                                        <Grid sx={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '30px',
                                                backgroundColor: 'rgba(12, 14, 11, 255)',
                                                justifyContent: 'end'
                                        }} container>
                                                <Grid sx={{
                                                        width: '5%',
                                                        height: '100%',
                                                        flexDirection: 'column',
                                                        display: 'flex',
                                                        // justifyContent:'flex-start'
                                                }} container>
                                                        <Grid sx={{
                                                                width: '100%',
                                                                height: '15%',
                                                                justifyContent: 'center',
                                                                // alignItems:'center'
                                                                marginTop: '20px'
                                                        }} container>
                                                                <Avatar alt="profile dp" src={dp} sx={{ width: 45, height: 45 }} />
                                                        </Grid>
                                                        <Grid sx={{
                                                                width: '100%',
                                                                height: '50%',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                        }} container>
                                                                <IconButton aria-label="list" >
                                                                        <AccountCircleOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
                                                                </IconButton>
                                                                <IconButton aria-label="list" >
                                                                        <AssignmentOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
                                                                </IconButton>
                                                        </Grid>
                                                </Grid>
                                                <Grid sx={{
                                                        width: '95%',
                                                        height: '100%',
                                                        borderRadius: '30px',
                                                        backgroundColor: 'white'
                                                }} container>
                                                        <Grid sx={{
                                                                bgcolor: grey[300],
                                                                borderTopLeftRadius: '30px',
                                                                borderBottomLeftRadius: '30px'
                                                        }} xs={4}>
                                                                <Grid sx={{
                                                                        p: 3,
                                                                        // justifyItems: 'center',
                                                                        display: 'flex',
                                                                        // alignItems:'center'
                                                                }} container>
                                                                        <Grid sx={{ alignItems: 'center' }} container>
                                                                                <Typography variant="h4" gutterBottom>
                                                                                        Task List
                                                                                </Typography>
                                                                        </Grid>
                                                                        <Grid container>
                                                                                <Grid sx={{
                                                                                        p: 2,
                                                                                        display: 'flex',
                                                                                        flexDirection: 'row',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center'
                                                                                }} container spacing={1}>
                                                                                        <Grid xs={4} sx={{
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                ":hover": {
                                                                                                        borderRadius: '15px',
                                                                                                        bgcolor: deepOrange[500],
                                                                                                }
                                                                                        }} container>
                                                                                                <Typography variant='h6' gutterBottom>New</Typography>
                                                                                        </Grid>
                                                                                        <Grid xs={4} sx={{
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                ":hover": {
                                                                                                        borderRadius: '15px',
                                                                                                        bgcolor: deepOrange[500],
                                                                                                }
                                                                                        }} container>
                                                                                                <Typography variant='h6' gutterBottom>Preparing</Typography>
                                                                                        </Grid>
                                                                                        <Grid xs={4} sx={{
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                ":hover": {
                                                                                                        borderRadius: '15px',
                                                                                                        bgcolor: deepOrange[500],
                                                                                                }
                                                                                        }} container>
                                                                                                <Typography variant='h6' gutterBottom>Delivery</Typography>
                                                                                        </Grid>
                                                                                </Grid>
                                                                        </Grid>
                                                                        <Grid container>
                                                                                <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '15px' }} >
                                                                                        <ListItem>
                                                                                                <ListItemAvatar>
                                                                                                </ListItemAvatar>
                                                                                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                                                                        </ListItem>
                                                                                        <Divider></Divider>
                                                                                        <ListItem>
                                                                                                <ListItemAvatar>
                                                                                                </ListItemAvatar>
                                                                                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                                                                        </ListItem>
                                                                                        <Divider></Divider>
                                                                                        <ListItem>
                                                                                                <ListItemAvatar>
                                                                                                </ListItemAvatar>
                                                                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                                                                        </ListItem>
                                                                                        {/* <Divider></Divider> */}
                                                                                </List>
                                                                        </Grid>
                                                                </Grid>x
                                                        </Grid>
                                                        <Grid xs={8} sx={{
                                                                p: 4,
                                                                bgcolor: 'white',
                                                                alignContent: 'center',
                                                                justifyContent: 'center'
                                                        }} container>
                                                                <Grid sx={{
                                                                        p: 2,
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        border: '3px solid',
                                                                        borderColor: grey[300]
                                                                }} >
                                                                        <Grid sx={{ p: 2 }}>
                                                                                <Typography variant="h4" gutterBottom>
                                                                                        XYZ Restaurant
                                                                                </Typography>
                                                                        </Grid>
                                                                        <Grid sx={{ p: 2 }}>
                                                                                <TextField
                                                                                        id="outlined-read-only-input"
                                                                                        label="Food Name"
                                                                                        defaultValue="Food Name"
                                                                                        InputProps={{

                                                                                        }}
                                                                                />
                                                                        </Grid>
                                                                        <Grid sx={{ p: 2 }}>
                                                                                <TextField
                                                                                        id="outlined-read-only-input"
                                                                                        label="Description"
                                                                                        defaultValue="Description"
                                                                                        InputProps={{

                                                                                        }}
                                                                                />
                                                                        </Grid>
                                                                        <Grid sx={{ p: 2 }}>
                                                                                <TextField
                                                                                        id="outlined-read-only-input"
                                                                                        label="Meal Type"
                                                                                        defaultValue="Meal Type"
                                                                                        InputProps={{

                                                                                        }}
                                                                                />
                                                                        </Grid>
                                                                        <Grid sx={{ p: 2 }}>
                                                                                <TextField
                                                                                        id="outlined-read-only-input"
                                                                                        label="Cuisine"
                                                                                        defaultValue="Cuisine"
                                                                                        InputProps={{

                                                                                        }}
                                                                                />
                                                                        </Grid>
                                                                        <Grid sx={{ p: 2 }}>
                                                                                <TextField
                                                                                        id="outlined-read-only-input"
                                                                                        label="Price"
                                                                                        defaultValue="Price"
                                                                                        InputProps={{

                                                                                        }}
                                                                                />
                                                                        </Grid>
                                                                        <Grid sx={{ p: 2 }}>
                                                                                <Button sx={{
                                                                                        // marginTop: '3px',
                                                                                        bgcolor: deepOrange[500],
                                                                                        ":hover": {
                                                                                                bgcolor: deepOrange[500],
                                                                                                border: '1px solid black'
                                                                                        }
                                                                                }} variant='contained' onClick={() => { }}>Update</Button>
                                                                        </Grid>
                                                                </Grid>
                                                        </Grid>
                                                </Grid>
                                        </Grid>
                                </Grid>

                        </Grid>
                </Grid >
        )
}