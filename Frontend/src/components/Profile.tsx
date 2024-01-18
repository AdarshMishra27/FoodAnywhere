import React from 'react'
import Navbar from './Navbar'
import { Avatar, Box, Grid, IconButton } from '@mui/material'
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
                                                        }} xs={4}></Grid>
                                                        <Grid xs={8} sx={{ bgcolor: 'white' }}></Grid>
                                                </Grid>
                                        </Grid>
                                </Grid>

                        </Grid>
                </Grid >
        )
}