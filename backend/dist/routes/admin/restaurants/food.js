"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../../middleware/index");
const db_1 = require("../../../db");
const router = express_1.default.Router();
router.post('/:restaurantID/food/add', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantID } = req.params;
    const food = req.body;
    const newFood = new db_1.Food(food);
    try {
        const foodFormed = yield newFood.save();
        const hotel = yield db_1.Restaurants.findById(restaurantID);
        if (!hotel) {
            res.status(500).json({ error: "no restaurant found in which food is to be added" });
            return;
        }
        try {
            yield db_1.Restaurants.updateOne({ _id: restaurantID }, {
                $set: {
                    food: [...hotel.food, foodFormed]
                }
            });
            res.status(200).json(foodFormed);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to add the food in the restaurant" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create a new Food Item" });
    }
}));
router.get('/:restaurantID/food/getAll', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantID = req.params.restaurantID;
    try {
        const hotel = yield db_1.Restaurants.findById(restaurantID);
        if (!hotel) {
            res.status(500).json({ error: "no restaurant found in which food is to be added" });
            return;
        }
        res.json(hotel.food);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}));
//filter by meal_type
router.get('/food/mealType/:mealType', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.mealType;
    try {
        const food = yield db_1.Food.find({ meal_type: type });
        if (!food) {
            res.status(500).json({ error: "no food available" });
            return;
        }
        res.json(food);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to fetch data by filter typr" });
    }
}));
//filter by cuisine
router.get('/food/cuisine/:cuisine', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.cuisine;
    try {
        const food = yield db_1.Food.find({ cuisine: type });
        if (!food) {
            res.status(500).json({ error: "no food available" });
            return;
        }
        res.json(food);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to fetch data by filter typr" });
    }
}));
router.patch('/:restaurantID/food/update/:foodID', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const restaurantID = req.params.restaurantID;
    const foodID = req.params.foodID;
    const changes = req.body;
    try {
        const food = yield db_1.Food.findByIdAndUpdate(foodID, changes, { returnDocument: "after" });
        if (!food) {
            res.status(500).json({ error: "Food does not exist" });
            return;
        }
        const hotel = yield db_1.Restaurants.findById(restaurantID);
        if (!hotel) {
            res.send(500).json({ error: "no restaurant found in which food is to be added" });
            return;
        }
        let idx = -1;
        for (let i = 0; i < hotel.food.length; i++) {
            if (((_a = hotel.food[i]._id) === null || _a === void 0 ? void 0 : _a.toString()) == foodID) {
                idx = i;
                break;
            }
        }
        if (idx === -1) {
            res.status(500).json({ error: "food does not exist in restaurant" });
        }
        else {
            hotel.food.splice(idx, 1);
            hotel.food.push(food);
            yield db_1.Restaurants.findOneAndUpdate({ _id: restaurantID }, { food: hotel.food });
            res.json(food);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update the food item" });
    }
}));
router.delete('/:restaurantID/food/del/:foodID', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const restaurantID = req.params.restaurantID;
    const foodID = req.params.foodID;
    try {
        const food = yield db_1.Food.findByIdAndDelete(foodID);
        if (!food) {
            res.status(500).json({ error: "Food does not exist" });
            return;
        }
        const hotel = yield db_1.Restaurants.findById(restaurantID);
        if (!hotel) {
            res.send(500).json({ error: "no restaurant found in which food is to be added" });
            return;
        }
        let idx = -1;
        for (let i = 0; i < hotel.food.length; i++) {
            if (((_b = hotel.food[i]._id) === null || _b === void 0 ? void 0 : _b.toString()) == foodID) {
                idx = i;
                break;
            }
        }
        if (idx === -1) {
            res.status(500).json({ error: "food does not exist in restaurant" });
        }
        else {
            hotel.food.splice(idx, 1);
            yield db_1.Restaurants.findOneAndUpdate({ _id: restaurantID }, { food: hotel.food });
            res.json(food);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete the food item" });
    }
}));
exports.default = router;
