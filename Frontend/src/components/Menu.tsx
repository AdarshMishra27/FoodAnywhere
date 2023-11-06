import React, { useReducer, useState } from 'react'
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
import { MealType, Cuisine } from '../utilities/Enums';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';

interface FoodBlueprint {
        name: string,
        description: string,
        restaurant: string,
        restaurant_address: string,
        meal_type: "Breakfast" | "Lunch" | "Dinner",
        cuisine: "American" | "Seafood" | "Indian" | "Chinese" | "Italian" | "Mexican" | "Spanish" | "Israeli " | "Japanese",
        price: number
}

export default function Menu() {
        const mealTypes: Array<MealType> = Object.values(MealType)
        const cuisines: Array<Cuisine> = Object.values(Cuisine)
        const filterURL = "http://localhost:3000/admin/restaurants/food/"
        const getAllFoodsURL = "http://localhost:3000/admin/restaurants/food/getAll"

        const [foods, setFoods] = useState<FoodBlueprint[]>([]);
        const [order, setOrder] = useState<FoodBlueprint[]>([]);
        const [totalPrice, setTotalPrice] = useState(0)
        // const [, forceUpdate] = useReducer(x => x + 1, 0); //for force updating the order side render

        React.useEffect(() => {
                async function fetchFood(URL: string) {
                        try {
                                const response = await fetch(URL, {
                                        method: 'GET',
                                        headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${localStorage.getItem("token")}`
                                        }
                                })
                                // console.log(response)
                                const resp = await response.json()
                                // console.log(resp);
                                setFoods(resp)
                        } catch (error) {
                                // console.log(error)
                                alert("something went wrong.")
                        }
                }
                fetchFood(getAllFoodsURL)
        }, [])

        const fetchByFilter = async (filter: MealType | Cuisine, endpoint: string) => {
                const URL = filterURL + endpoint + "/" + filter
                try {
                        const response = await fetch(URL, {
                                method: 'GET',
                                headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${localStorage.getItem("token")}`
                                }

                        })
                        const parsedResponse = await response.json()
                        setFoods(parsedResponse)

                } catch (error) {
                        // console.log(error);
                        alert("something went wrong.")
                }
        }

        function addItemInOrder(food: FoodBlueprint) {
                order.push(food)
                setTotalPrice(totalPrice + food.price)
                setOrder(order)
                // forceUpdate();
        }

        const addItemInOrderWithIndex = (index: number) => {
                addItemInOrder(order[index])
                // order.splice(index, 1)
                // setTotalPrice(totalPrice + order[index].price)
                // setOrder(order)
                // forceUpdate()
        }

        const removeItemInOrderWithIndex = (index: number) => {
                setTotalPrice(totalPrice - order[index].price)
                order.splice(index, 1)
                setOrder(order)
                // forceUpdate()
        }

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
                                                <FilterBar filterTypes={mealTypes} fetchByFilter={fetchByFilter} endpoint='mealType'></FilterBar>
                                                <FilterBar filterTypes={cuisines} fetchByFilter={fetchByFilter} endpoint='cuisine'></FilterBar>
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
                                                {
                                                        foods.map((food) => {
                                                                // console.log(food);
                                                                return <FoodCard addItemInOrder={addItemInOrder} food={food}></FoodCard>
                                                        })
                                                }
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
                                                                <OrderCard order={order} addItemInOrderWithIndex={addItemInOrderWithIndex} removeItemInOrderWithIndex={removeItemInOrderWithIndex} totalPrice={totalPrice}></OrderCard>
                                                        </Box>
                                                </Box>
                                        </Box>
                                </Grid>
                        </Grid>

                </Grid >
        )
}

export function FoodCard(props: {
        addItemInOrder(food: FoodBlueprint): void,
        food: FoodBlueprint
}) {
        const food = props.food
        const foodName = food.name
        const description = food.description
        const price = food.price
        const restaurant = food.restaurant
        const restaurantAddress = food.restaurant_address
        const addItemInOrder = props.addItemInOrder
        return (
                <>
                        <Grid xs={3} item>
                                <Card sx={{ maxWidth: 250, borderRadius: '25px' }}>
                                        <CardMedia
                                                sx={{ height: 140 }}
                                                image={ramen}
                                                title="ramen"
                                        />
                                        <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                        {foodName}
                                                </Typography>
                                                <Typography gutterBottom variant="body2" component="div">
                                                        {restaurant}
                                                </Typography>
                                                <Typography gutterBottom variant="body2" component="div">
                                                        {restaurantAddress}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                        {description}
                                                </Typography>
                                        </CardContent>
                                        <CardActions>
                                                <Button sx={{ color: deepOrange[500] }} size="small" onClick={() => (addItemInOrder(food))}>Add</Button>
                                                <Button sx={{ color: deepOrange[500] }} disabled size="small">{price}</Button>
                                        </CardActions>
                                </Card>
                        </Grid>
                </>
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

export function OrderCard(props: {
        order: FoodBlueprint[],
        addItemInOrderWithIndex(index: number): void
        removeItemInOrderWithIndex(index: number): void,
        totalPrice: number
}) {
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
                                                        marginTop: 2,
                                                        height: 'fit-content'
                                                }}>
                                                        {
                                                                props.order.map((food, index) => {
                                                                        console.log(food)
                                                                        return <ItemRate food={food} index={index}
                                                                                addItemInOrderWithIndex={props.addItemInOrderWithIndex} removeItemInOrderWithIndex={props.removeItemInOrderWithIndex}></ItemRate>
                                                                })
                                                        }
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
                                        <Typography variant='inherit' fontSize={25}>Total: Rs. {props.totalPrice}</Typography>
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

export function ItemRate(props: {
        food: FoodBlueprint,
        index: number,
        addItemInOrderWithIndex(index: number): void
        removeItemInOrderWithIndex(index: number): void
}) {
        return (
                <>
                        <Grid container spacing={1}>
                                <Grid item xs={12} sx={{
                                        m: 0,
                                        p: 0,
                                        textAlign: 'start'
                                }}>
                                        <Stack direction='row' spacing={1}>
                                                <Box sx={{
                                                        m: 0, p: 0,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center'
                                                }}>
                                                        <Typography variant='body1'>
                                                                {props.food.name}
                                                        </Typography>
                                                </Box>
                                                <IconButton aria-label="delete" onClick={() => props.addItemInOrderWithIndex(props.index)}>
                                                        <AddIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => props.removeItemInOrderWithIndex(props.index)}>
                                                        <RemoveIcon />
                                                </IconButton>
                                                <Box sx={{
                                                        m: 0, p: 0,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center'
                                                }}>
                                                        <Typography variant='body1'>
                                                                {props.food.price}
                                                        </Typography>
                                                </Box>
                                        </Stack>
                                </Grid>
                        </Grid>
                </>
        );
}

export function FilterBar(props: {
        filterTypes: MealType[] | Cuisine[],
        fetchByFilter(filter: MealType | Cuisine, endpoint: string): void,
        endpoint: string //url endpoint
}) {
        const filterTypes = props.filterTypes
        const fetchByFilter = props.fetchByFilter
        return (
                <>
                        {
                                filterTypes.map((filterBy) => (
                                        <>
                                                <Box onClick={() => { fetchByFilter(filterBy, props.endpoint) }} bgcolor={deepOrange[500]} sx={{
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
                                                                {filterBy}
                                                        </Typography>
                                                </Box>
                                        </>
                                ))
                        }

                </>
        )
}