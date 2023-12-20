import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { userState } from '../store/atoms/user';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

export default function Navbar(props: {
        buttonName: string
}) {
        const navigate = useNavigate()
        const setUser = useSetRecoilState(userState); //recoil
        const logout = () => {
                setUser({
                        isLoading: false,
                        userDetails: null
                })
                localStorage.clear()
                navigate('/auth')
        }

        return (
                <>
                        <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static" sx={{ bgcolor: deepOrange[500] }}>
                                        <Toolbar>
                                                <IconButton
                                                        size="large"
                                                        edge="start"
                                                        color="inherit"
                                                        aria-label="menu"
                                                        sx={{ mr: 2 }}
                                                >
                                                        <MenuIcon />
                                                </IconButton>
                                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                                        Food - Anywhere
                                                </Typography>
                                                {
                                                        props.buttonName === 'login' ?
                                                                <Button color="inherit" disabled>{"login / signup"}</Button> : <Button color="inherit" onClick={logout}>{props.buttonName}</Button>
                                                }
                                        </Toolbar>
                                </AppBar>
                        </Box>
                </>
        );
}
