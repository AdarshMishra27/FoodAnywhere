import express from "express"
import { authenticateJwt } from "../../../middleware/index"
import { Restaurants as Hotel, Admin } from "../../../db"

const router = express.Router()

interface Restaurant {
        name: string,
        address: string
}

router.post('/add', authenticateJwt, async (req, res) => {
        const inputs: Restaurant = req.body;
        const _id = req.headers["_id"]
        const newRestaurant = new Hotel({
                name: inputs.name,
                address: inputs.address,
                food: [],
                orders: []
        });
        try {
                const restaurantFormed = await newRestaurant.save();
                await Admin.findByIdAndUpdate(_id, { restaurant: restaurantFormed._id });
                res.status(200).json(restaurantFormed);
        } catch (error) {
                res.status(500).json({ error: "Failed to create a new Restaurant" })
        }
});

router.get('/get/:id', authenticateJwt, async (req, res) => {
        const { id } = req.params
        try {
                const returnedHotel = await Hotel.findById(id)
                res.json(returnedHotel);
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Couldn't find the Restaurant" })
        }
})

router.get('/getAll', authenticateJwt, async (req, res) => {
        const { id } = req.params
        const { limit, page } = req.query
        if (typeof limit !== 'string') {
                res.status(500).json({ error: "limit undefined" })
                return
        }
        try {
                const returnedHotel = await Hotel.find().limit(parseInt(limit))
                res.json(returnedHotel);
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Couldn't find the Restaurant" })
        }
})

router.patch('/update/:id', authenticateJwt, async (req, res) => {
        const { id } = req.params
        const changes: Restaurant = req.body
        try {
                const updatedRestaurant = await Hotel.findByIdAndUpdate(id, changes)
                if (updatedRestaurant) {
                        console.log("Successfully updated....");
                        res.status(200).json(updatedRestaurant)
                }
                else {
                        res.status(500).json({ error: "No such Restaurant" })
                }
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to update the restaurant " + changes.name })
        }
})

router.delete('/del/:id', authenticateJwt, async (req, res) => {
        const { id } = req.params
        const restName = req.body.name;
        try {
                const deletedRestaurant = await Hotel.findByIdAndDelete(id)
                if (deletedRestaurant) {
                        const userId = req.headers["_id"]
                        //also delete the ref in admin
                        const owner = await Admin.findByIdAndUpdate(userId, { restaurant: null });
                        if (!owner) return
                        console.log("deleting ref in admin too....." + owner.username);

                        console.log("Successfully deleted....");
                        res.json(deletedRestaurant)
                } else {
                        res.status(500).json({ error: "No such Restaurant" })
                }
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: `Failed to delete ${restName}` })
        }
})

export default router