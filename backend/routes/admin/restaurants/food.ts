import express from 'express'
import { authenticateJwt } from "../../../middleware/index"
import { Restaurants, Food } from "../../../db"
import mongoose from 'mongoose'

const router = express.Router()

interface FoodBlueprint {
        name: string,
        description: string,
        restaurantId: mongoose.Types.ObjectId,
        restaurant: string,
        restaurant_address: string,
        meal_type: "Breakfast" | "Lunch" | "Dinner",
        cuisine: "American" | "Seafood" | "Indian" | "Chinese" | "Italian" | "Mexican" | "Spanish" | "Israeli " | "Japanese",
        price: number
}

router.post('/:restaurantID/food/add', authenticateJwt, async (req, res) => {
        const { restaurantID } = req.params
        const food: FoodBlueprint = req.body
        const newFood = new Food(food)
        try {
                const foodFormed = await newFood.save();
                const hotel = await Restaurants.findById(restaurantID)
                if (!hotel) {
                        res.status(500).json({ error: "no restaurant found in which food is to be added" })
                        return;
                }
                try {
                        await Restaurants.updateOne({ _id: restaurantID }, {
                                $set: {
                                        food: [...hotel.food, foodFormed]
                                }
                        })
                        res.status(200).json(foodFormed);
                } catch (error) {
                        console.log(error);
                        res.status(500).json({ error: "Failed to add the food in the restaurant" })
                }
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to create a new Food Item" })
        }
})

router.get('/:restaurantID/food/getAll', authenticateJwt, async (req, res) => {
        const restaurantID = req.params.restaurantID
        try {
                const hotel = await Restaurants.findById(restaurantID)
                if (!hotel) {
                        res.status(500).json({ error: "food not found" })
                        return;
                }
                res.json(hotel.food);
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to fetch data" })
        }
})

router.get('/food/getAll', authenticateJwt, async (req, res) => {
        try {
                const response = await Food.find({})
                if (!response) {
                        res.status(500).json({ error: "food not found" })
                        return;
                }
                res.json(response);
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to fetch data" })
        }
})

//filter by meal_type
router.get('/food/mealType/:mealType', authenticateJwt, async (req, res) => {
        const type = req.params.mealType
        try {
                const food = await Food.find({ meal_type: type });
                if (!food) {
                        res.status(500).json({ error: "no food available" })
                        return
                }
                res.json(food)
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "failed to fetch data by filter typr" })
        }
})

//filter by cuisine
router.get('/food/cuisine/:cuisine', authenticateJwt, async (req, res) => {
        const type = req.params.cuisine
        try {
                const food = await Food.find({ cuisine: type });
                if (!food) {
                        res.status(500).json({ error: "no food available" })
                        return
                }
                res.json(food)
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "failed to fetch data by filter typr" })
        }
})

router.patch('/:restaurantID/food/update/:foodID', authenticateJwt, async (req, res) => {
        const restaurantID = req.params.restaurantID
        const foodID = req.params.foodID
        const changes = req.body
        try {
                const food = await Food.findByIdAndUpdate(foodID, changes, { returnDocument: "after" })
                if (!food) {
                        res.status(500).json({ error: "Food does not exist" })
                        return
                }
                const hotel = await Restaurants.findById(restaurantID)
                if (!hotel) {
                        res.send(500).json({ error: "no restaurant found in which food is to be added" })
                        return;
                }

                let idx = -1
                for (let i = 0; i < hotel.food.length; i++) {
                        if (hotel.food[i]._id?.toString() == foodID) {
                                idx = i;
                                break;
                        }
                }
                if (idx === -1) {
                        res.status(500).json({ error: "food does not exist in restaurant" })
                } else {
                        hotel.food.splice(idx, 1);
                        hotel.food.push(food)
                        await Restaurants.findOneAndUpdate({ _id: restaurantID }, { food: hotel.food })
                        res.json(food)
                }

        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to update the food item" })
        }
})

router.delete('/:restaurantID/food/del/:foodID', authenticateJwt, async (req, res) => {
        const restaurantID = req.params.restaurantID
        const foodID = req.params.foodID
        try {
                const food = await Food.findByIdAndDelete(foodID)
                if (!food) {
                        res.status(500).json({ error: "Food does not exist" })
                        return
                }
                const hotel = await Restaurants.findById(restaurantID)
                if (!hotel) {
                        res.send(500).json({ error: "no restaurant found in which food is to be added" })
                        return;
                }

                let idx = -1
                for (let i = 0; i < hotel.food.length; i++) {
                        if (hotel.food[i]._id?.toString() == foodID) {
                                idx = i;
                                break;
                        }
                }
                if (idx === -1) {
                        res.status(500).json({ error: "food does not exist in restaurant" })
                } else {
                        hotel.food.splice(idx, 1);
                        await Restaurants.findOneAndUpdate({ _id: restaurantID }, { food: hotel.food })
                        res.json(food)
                }

        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to delete the food item" })
        }
})



export default router