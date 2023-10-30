import React from 'react'
import { Grid, Box, Paper } from '@mui/material'
import { deepOrange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ramen from '../assets/ramen.jpg'

export default function Menu() {
        return (
                <Grid sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                }}>
                        <Grid container sx={{
                                width: '85%',
                                height: '80%'
                        }} spacing={2}>
                                <Grid item xs={9} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: '100%'
                                }}>
                                        <Box bgcolor={deepOrange[50]} sx={{
                                                borderRadius: '25px',
                                                height: '10%',
                                                width: '100%',
                                                alignItems: 'center',
                                                overflowX: 'scroll',
                                                whiteSpace: 'nowrap',
                                                padding: '4px'
                                        }}>
                                                <Box bgcolor={deepOrange[500]} sx={{
                                                        width: '200px',
                                                        display: 'inline-block',
                                                        borderRadius: '25px',
                                                        height: '75%',
                                                        textAlign: 'center',
                                                        margin: '4px',
                                                        "&:hover": {
                                                                border: '2px solid'
                                                        }

                                                }}>
                                                        <Typography variant='h6' color={'white'}>
                                                                Meal Type
                                                        </Typography>

                                                </Box>
                                                <Box bgcolor={deepOrange[500]} sx={{
                                                        width: '200px',
                                                        display: 'inline-block',
                                                        borderRadius: '25px',
                                                        height: '75%',
                                                        textAlign: 'center',
                                                        margin: '4px',
                                                        "&:hover": {
                                                                border: '2px solid'
                                                        }

                                                }}>
                                                        <Typography variant='h6' color={'white'}>
                                                                Cuisine
                                                        </Typography>
                                                </Box>

                                        </Box>

                                        <Box sx={{
                                                height: '5%',
                                                width: '100%'
                                        }}>
                                                {/* white space */}
                                        </Box>

                                        <Grid container spacing={3} bgcolor={deepOrange[50]} sx={{
                                                height: '85%',
                                                width: '100%',
                                                margin: '0',
                                                borderRadius: '25px',
                                                overflowY: 'scroll'
                                        }}>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                                <Grid xs={3} item>
                                                        <FoodCard></FoodCard>
                                                </Grid>
                                        </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                        <Box bgcolor={deepOrange[50]} sx={{
                                                height: '100%',
                                                borderRadius: '25px',
                                                p: '5px'
                                        }}>
                                                <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        height: '10%'
                                                }}>
                                                        <SearchBar></SearchBar>
                                                </Box>
                                                <Box sx={{
                                                        height: '90%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center'
                                                }}>
                                                        <Box sx={{
                                                                height: '90%'
                                                        }}>
                                                                <OrderCard></OrderCard>
                                                        </Box>
                                                </Box>
                                        </Box>
                                </Grid>
                        </Grid>

                </Grid >
        )
}

export function FoodCard() {
        return (
                <Card sx={{ maxWidth: 250, borderRadius: '25px' }}>
                        <CardMedia
                                sx={{ height: 140 }}
                                image={ramen}
                                title="ramen"
                        />
                        <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                        Ramen
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                        Ramen is a Japanese noodle dish. It consists of Chinese-style wheat noodles served in a broth; common flavors are soy sauce and miso, with typical toppings including sliced pork, nori, menma, and scallions.
                                </Typography>
                        </CardContent>
                        <CardActions>
                                <Button sx={{ color: deepOrange[500] }} size="small">Add</Button>
                                <Button sx={{ color: deepOrange[500] }} size="small">Rs. 500</Button>
                        </CardActions>
                </Card>
        );
}

export function SearchBar() {
        return (
                <>
                        <Paper component="form" variant='outlined'
                                sx={{
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '40px',
                                        borderRadius: '15px',
                                        width: '80%'
                                }}>
                                <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Food"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                </IconButton>
                                {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                        </Paper>
                </>
        );
}

export function OrderCard() {
        return (
                <>
                        <Box sx={{
                                width: '100%',
                                height: '85%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'
                        }}>
                                <Paper variant='outlined' sx={{
                                        height: '100%',
                                        borderRadius: '15px',
                                        width: '80%'
                                }}>
                                        <Box sx={{
                                                width: '100%',
                                                height: '100%',
                                                margin: '10px'
                                        }}>
                                                <Typography variant='h5'>
                                                        Your Order
                                                </Typography>
                                                <Divider sx={{ marginTop: 2, width: '92%' }} orientation="horizontal">
                                                </Divider>
                                                <Box sx={{
                                                        marginTop: 2
                                                }}>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>
                                                        <ItemRate></ItemRate>


                                                </Box>

                                        </Box>
                                </Paper>
                        </Box>

                        <Box sx={{
                                width: '100%',
                                height: '15%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 1,
                        }}>
                                <Paper variant='outlined' sx={{
                                        height: '100%',
                                        borderRadius: '15px',
                                        width: '80%',
                                        p: '7px'
                                }}>
                                        <Typography variant='inherit' fontSize={25}>Total: Rs. 5000</Typography>
                                        <Button sx={{
                                                marginTop: '3px',
                                                bgcolor: deepOrange[500],
                                                ":hover": {
                                                        bgcolor: deepOrange[500],
                                                        border: '1px solid black'
                                                }
                                        }} variant='contained'>ORDER</Button>
                                </Paper >
                        </Box>


                </>
        );
}

export function ItemRate() {
        return (
                <>
                        <Grid container spacing={1}>
                                <Grid item xs={6} sx={{
                                        m: 0,
                                        p: 0,
                                        textAlign: 'start'
                                }}>
                                        <Typography variant='body1'>
                                                Food Type 1:
                                        </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{
                                        m: 0,
                                        p: 0,
                                        textAlign: 'center'
                                }}>
                                        <Typography variant='body1'>
                                                Rs. 500
                                        </Typography>
                                </Grid>
                        </Grid>
                </>
        );
}