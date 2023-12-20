import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Box, Button, Grid, Typography } from '@mui/material'
import bgImg from '../assets/bgimage.jpg'
import { deepOrange } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
        const navigate = useNavigate()
        function enterAuth(clientPath: "admin" | "user") {
                localStorage.setItem("client", clientPath);
                navigate('/auth');
        }

        useEffect(() => {
                localStorage.clear()
        }, [])

        return (
                <Grid sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'fixed'
                }}>
                        <Navbar buttonName='login'></Navbar>
                        <Grid sx={{
                                width: '100%',
                                height: '100%',
                                position: 'relative'
                        }} container>
                                <Box sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        opacity: 1,
                                        background: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${bgImg}) center/cover no-repeat`
                                }}></Box>
                                <Grid container sx={{ width: '100%', height: '100%', position: 'absolute' }}>
                                        <Grid item xs={6} >
                                                {/* left part */}
                                                <Grid container sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                }} spacing={3}>
                                                        <Grid item>
                                                                <Typography variant="h1" component="h4" color={'black'}>
                                                                        Order Food<br></br>The Easy Way
                                                                </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                                <Grid container spacing={3}>
                                                                        <Grid item>
                                                                                <Button variant='contained' sx={{ bgcolor: deepOrange[500], ":hover": { bgcolor: deepOrange[50] } }} onClick={() => enterAuth("admin")}>Admin</Button>
                                                                        </Grid>
                                                                        <Grid item>
                                                                                <Button variant='contained' sx={{ bgcolor: deepOrange[500], ":hover": { bgcolor: deepOrange[50] } }} onClick={() => enterAuth("user")}>User</Button>
                                                                        </Grid>
                                                                </Grid>
                                                        </Grid>
                                                </Grid>
                                        </Grid>
                                        <Grid item xs={6}>
                                                {/* blank for now - right part */}
                                        </Grid>
                                </Grid>
                        </Grid>
                </Grid >
        )
}
