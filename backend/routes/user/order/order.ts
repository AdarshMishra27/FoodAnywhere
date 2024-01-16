import express from 'express'
import { authenticateJwt } from '../../../middleware'
import { User, Food, Order, Restaurants } from '../../../db'
import mongoose from 'mongoose'

const router = express.Router()

interface OrderType {
        restaurant: {
                restaurantId: mongoose.Types.ObjectId,
                food: mongoose.Types.ObjectId[]
        },
        user: {
                name: string,
                address: string
        },
        totalPrice: number
}

router.post('/place', authenticateJwt, async (req, res) => {
        const body = req.body
        const userId = req.headers._id

        let totalPrice = 0
        let foodArray = []
        for (let i = 0; i < body.food.length; i++) {
                const foodItem = body.food[i]
                foodArray.push(new mongoose.Types.ObjectId(foodItem))
                const food = await Food.findById(foodArray[foodArray.length - 1])
                const price = food?.price
                console.log("ordering: " + food?.name + " {" + food?.price + "}");
                if (price)
                        totalPrice += price
        }

        const username = (await User.findById(userId))?.username
        if (!username) {
                console.log("userId given is: " + userId);
                res.status(500).json({ error: "userId in req is invalid" })
                return
        }

        const orderToBePlaced: OrderType = {
                restaurant: {
                        restaurantId: new mongoose.Types.ObjectId(body.restaurantId),
                        food: foodArray
                },
                user: {
                        name: username,
                        address: body.address
                },
                totalPrice
        }
        try {
                const order = await (new Order(orderToBePlaced).save())
                await User.findByIdAndUpdate(userId, { order: order._id }, { returnDocument: 'after' })
                const hotel = await Restaurants.findById(body.restaurantId)
                if (!hotel) {
                        res.status(500).json({ error: 'restaurant id does not exist' })
                        return
                }
                await Restaurants.findByIdAndUpdate(body.restaurantId, { orders: [...hotel?.orders, order._id] })
                res.json(order)
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'cannot create the order' })
        }
})

router.get('/get/:orderId', authenticateJwt, async (req, res) => {
        const orderId = req.params.orderId
        try {
                const order = await Order.findById(orderId)
                if (!order) {
                        res.status(500).json({ error: "no such order exists" })
                        return
                }
                res.json(order)
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "order fetch failure" })
        }
})

router.patch('/update/:orderId', authenticateJwt, async (req, res) => {
        const orderId = req.params.orderId
        const body = req.body
        const userId = req.headers._id

        let totalPrice = 0
        for (let i = 0; i < body.food.length; i++) {
                const foodItem = body.food[i]
                const food = await Food.findById(foodItem)
                const price = food?.price

                if (price)
                        totalPrice += price
        }

        const username = (await User.findById(userId))?.username
        if (!username) {
                res.status(500).json({ error: "userId in req is invalid" })
                return
        }

        const updatedOrder: OrderType = {
                restaurant: {
                        restaurantId: body.restaurantId,
                        food: body.food
                },
                user: {
                        name: username,
                        address: body.address
                },
                totalPrice
        }

        try {
                const order = await Order.findByIdAndUpdate(orderId, updatedOrder, { returnDocument: "after" })
                if (!order) {
                        res.status(500).json({ error: "no such order exists" })
                        return
                }

                res.json(order)
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "order update failure" })
        }
})

router.delete('/del/:orderId', authenticateJwt, async (req, res) => {
        const orderId = req.params.orderId
        const userId = req.headers['_id']

        try {
                const order = await Order.findByIdAndDelete(orderId)
                if (!order) {
                        res.status(500).json({ error: "no such order exists" })
                        return
                }

                await User.findByIdAndUpdate(userId, { order: null }, { returnDocument: 'after' })

                const hotel = await Restaurants.findById(order.restaurant?.restaurantId)
                if (!hotel) {
                        res.status(500).json({ error: 'restaurant id does not exist' })
                        return
                }
                let idx = -1;
                hotel.orders.filter((o) => {
                        return o._id === order._id
                })
                hotel.orders.splice(idx, 1)
                await Restaurants.findByIdAndUpdate(order.restaurant?.restaurantId, { orders: hotel?.orders }, { returnDocument: 'after' })

                res.json(order)
        } catch (error) {
                console.log(error);
                res.status(500).json({ error: "order delete failure" })
        }
})

export default router