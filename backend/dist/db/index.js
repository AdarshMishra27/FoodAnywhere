"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.User = exports.Food = exports.Restaurants = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    restaurant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Restaurants"
    }
}, { timestamps: true });
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    order: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order"
    }
}, { timestamps: true });
const orderSchema = new mongoose_1.default.Schema({
    restaurant: {
        restaurantId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Restaurants",
            required: true
        },
        food: [{
                type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
const foodSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    restaurantId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
const restaurantSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order"
        }]
}, { timestamps: true });
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
exports.Restaurants = mongoose_1.default.model('Restaurant', restaurantSchema);
exports.Food = mongoose_1.default.model('Food', foodSchema);
exports.User = mongoose_1.default.model('User', userSchema);
exports.Order = mongoose_1.default.model('Order', orderSchema);
