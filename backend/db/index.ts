import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
        username: {
                type: String,
                required: true
        },
        password: {
                type: String,
                required: true
        },
        restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Restaurants"
        }
}, { timestamps: true })

const userSchema = new mongoose.Schema({
        username: {
                type: String,
                required: true
        },
        password: {
                type: String,
                required: true
        },
        order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
        }
}, { timestamps: true })

const orderSchema = new mongoose.Schema({
        restaurant: {
                restaurantId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Restaurants",
                        required: true
                },
                food: [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Food"
                }]
        },
        user: {
                name: {
                        type: String,
                        required: true
                },
                address: {
                        type: String
                }
        },
        totalPrice: Number
}, { timestamps: true })

const foodSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        description: String,
        restaurantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Restaurants",
                required: true
        },
        restaurant: {
                type: String,
                required: true
        },
        restaurant_address: {
                type: String,
                required: true
        },
        meal_type: {
                type: String,
                enum: ["Breakfast", "Lunch", "Dinner"],
        },
        cuisine: {
                type: String,
                enum: ["Indian", "Chinese", "Italian", "Mexican", "Spanish", "Israeli", "Seafood", "American", "Japanese"]
        },
        price: {
                type: Number,
                required: true
        }
}, { timestamps: true })
const restaurantSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        address: {
                type: String,
                required: true
        },
        food: [foodSchema],
        orders: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
        }]
}, { timestamps: true })


export const Admin = mongoose.model('Admin', adminSchema)
export const Restaurants = mongoose.model('Restaurant', restaurantSchema)
export const Food = mongoose.model('Food', foodSchema)
export const User = mongoose.model('User', userSchema)
export const Order = mongoose.model('Order', orderSchema)
