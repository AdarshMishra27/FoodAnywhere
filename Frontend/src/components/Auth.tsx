import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { deepOrange } from '@mui/material/colors';
import { Box, Typography, Button, TextField } from '@mui/material';
import bgImg from '../assets/bgimage.jpg'
import { userState } from '../store/atoms/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function Auth(props: { isLoginRender: boolean }) {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [isLoginRender, setIsLoginRender] = useState(props.isLoginRender)
        const setUser = useSetRecoilState(userState); //recoil

        const AUTH_URL_LOGIN = "http://localhost:3000/clientPath/auth/login" //clientPath must be replaced by admin OR user
        const AUTH_URL_SIGNUP = "http://localhost:3000/clientPath/auth/signup" //clientPath must be replaced by admin OR user
        // const URL_LOGIN = "http://localhost:3000/user/auth/login"
        // const URL_SIGNUP = "http://localhost:3000/user/auth/signup"

        const navigate = useNavigate()

        useEffect(() => {

        }, [])

        const handleSubmit = async (URL: string) => {
                const clientPath = localStorage.getItem("client")
                if (!clientPath) {
                        alert("select User OR Admin first")
                        navigate('/')
                } else {
                        URL = URL.replace("clientPath", clientPath)
                        // AUTH_URL_SIGNUP = AUTH_URL_SIGNUP.replace("clientPath", clientPath)
                }

                //handle login
                try {
                        const response = await fetch(URL, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ username, password })

                        })

                        const parsedResponse = await response.json()
                        if (parsedResponse.token) {
                                // console.log(parsedResponse.token);
                                const userDetails = { token: parsedResponse.token, username: parsedResponse.username }
                                localStorage.setItem("userDetails", JSON.stringify(userDetails))
                                setUser({
                                        isLoading: false,
                                        userDetails: userDetails.username
                                })

                                navigate('/menu')
                        } else { //parsing error according to backend
                                setUser({
                                        isLoading: false,
                                        userDetails: null
                                })
                                if (parsedResponse.message) {
                                        alert(parsedResponse.message)
                                } else {
                                        alert(parsedResponse.error)
                                }
                                // console.log(parsedResponse);
                        }

                } catch (error) {
                        // console.log(error);
                        alert("something went wrong.")
                }
        }

        const switchParts = () => {
                //switches from login to sign up and vice-versa
                if (isLoginRender) {
                        setIsLoginRender(false)
                } else {
                        setIsLoginRender(true)
                }
        }

        return (
                <Box sx={{ height: '100vh', width: '100%' }}>

                        <Box component='img' src={bgImg} alt='bg_image'
                                sx={{
                                        position: 'absolute', width: '100%',
                                        height: '100vh', opacity: '0.8',
                                }}
                        ></Box >
                        {/* TODO -> put an image in background */}
                        {/* <Box
                                component="img"
                                sx={{
                                        height: 233,
                                        width: 350,
                                        maxHeight: { xs: 233, md: 167 },
                                        maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="bg_image"
                                src=""
                        /> */}

                        <Grid
                                container sx={{
                                        height: '100vh',
                                        position: 'relative',
                                        opacity: '0.9'
                                }}
                                justifyContent={'center'}
                        >

                                <Grid
                                        spacing={3}
                                        container
                                        sx={{
                                                height: '70%',
                                                margin: 'auto',
                                        }}
                                        xs={10} sm={8} lg={6}
                                >

                                        {
                                                isLoginRender &&
                                                (
                                                        <>
                                                                {/*  Left side */}
                                                                <LeftPart username={username} password={password}
                                                                        setUsername={setUsername} setPassword={setPassword}
                                                                        handleSubmit={() => handleSubmit(AUTH_URL_LOGIN)} mainHeading='Login to your Account!'
                                                                        buttonText='Sign In'></LeftPart>

                                                                {/* right side */}
                                                                <RightPart mainHeading='New Here?' subHeading='Sign up and get delicious food right at your door step!'
                                                                        switchParts={switchParts}
                                                                        buttonText='Sign Up'></RightPart>

                                                        </>

                                                )
                                        }

                                        {
                                                !isLoginRender &&
                                                (
                                                        <>
                                                                {/*  Left side */}
                                                                <LeftPart username={username} password={password}
                                                                        setUsername={setUsername} setPassword={setPassword}
                                                                        handleSubmit={() => handleSubmit(AUTH_URL_SIGNUP)} mainHeading='Create your Account!'
                                                                        buttonText='Sign Up'></LeftPart>

                                                                {/* right side */}
                                                                <RightPart mainHeading='Already have an account?' subHeading='Login and get delicious food right at your door step!'
                                                                        switchParts={switchParts}
                                                                        buttonText='Sign In'></RightPart>
                                                        </>
                                                )
                                        }

                                </Grid >

                        </Grid >

                </Box>
        )
}


interface leftPartPropsType {
        username: string,
        password: string,
        setUsername: React.Dispatch<React.SetStateAction<string>>,
        setPassword: React.Dispatch<React.SetStateAction<string>>,
        handleSubmit(): void,
        mainHeading: string,
        buttonText: string
}

function LeftPart(props: leftPartPropsType) {
        const { username, password, setUsername, setPassword, handleSubmit, mainHeading, buttonText } = props
        return (
                <Grid xs={12} sm={8} bgcolor={deepOrange[50]} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        borderRadius: '25px'
                }} justifyContent={'center'}>
                        <Typography variant='h3' sx={{ m: '4px', textAlign: 'center' }} >{mainHeading}</Typography>

                        <TextField label="username" variant="outlined" size='small' sx={{ m: '10px' }}
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }} />

                        <TextField label="password" variant="outlined" size='small' sx={{ m: '10px' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />

                        <Grid container sx={{ marginTop: '10px', justifyContent: 'center' }}>
                                <Button variant="contained" sx={{ backgroundColor: deepOrange[50], color: 'black' }}
                                        onClick={handleSubmit}>{buttonText}</Button>
                        </Grid>
                </Grid>
        )
}

function RightPart(props: { mainHeading: string, subHeading: string, switchParts(): void, buttonText: string }) {
        return (
                <Grid sm={4} bgcolor={deepOrange[500]} sx={{ display: { xs: 'none', sm: 'block', borderRadius: '25px' } }}>
                        <Grid container sx={{
                                height: '100%',
                                margin: 'auto',
                        }} alignContent={'center'} justifyContent={'center'}>
                                <Typography variant='h3' color={'white'} style={{ textAlign: 'center' }}>{props.mainHeading}</Typography>

                                <Typography color={'white'} style={{ textAlign: 'center', marginTop: '10px' }} >{props.subHeading}</Typography>

                                <Grid container sx={{ marginTop: '10px', justifyContent: 'center' }}>
                                        <Button variant="contained" sx={{ backgroundColor: deepOrange[50], color: 'black' }}
                                                onClick={props.switchParts}>{props.buttonText}</Button>
                                </Grid>
                        </Grid>

                </Grid >
        )
}

