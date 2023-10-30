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
router.post('/add', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    const _id = req.headers["_id"];
    const newRestaurant = new db_1.Restaurants({
        name: inputs.name,
        address: inputs.address,
        food: [],
        orders: []
    });
    try {
        const restaurantFormed = yield newRestaurant.save();
        yield db_1.Admin.findByIdAndUpdate(_id, { restaurant: restaurantFormed._id });
        res.status(200).json(restaurantFormed);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create a new Restaurant" });
    }
}));
router.get('/get/:id', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const returnedHotel = yield db_1.Restaurants.findById(id);
        res.json(returnedHotel);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't find the Restaurant" });
    }
}));
router.get('/getAll', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { limit, page } = req.query;
    if (typeof limit !== 'string') {
        res.status(500).json({ error: "limit undefined" });
        return;
    }
    try {
        const returnedHotel = yield db_1.Restaurants.find().limit(parseInt(limit));
        res.json(returnedHotel);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't find the Restaurant" });
    }
}));
router.patch('/update/:id', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedRestaurant = yield db_1.Restaurants.findByIdAndUpdate(id, changes);
        if (updatedRestaurant) {
            console.log("Successfully updated....");
            res.status(200).json(updatedRestaurant);
        }
        else {
            res.status(500).json({ error: "No such Restaurant" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update the restaurant " + changes.name });
    }
}));
router.delete('/del/:id', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const restName = req.body.name;
    try {
        const deletedRestaurant = yield db_1.Restaurants.findByIdAndDelete(id);
        if (deletedRestaurant) {
            const userId = req.headers["_id"];
            //also delete the ref in admin
            const owner = yield db_1.Admin.findByIdAndUpdate(userId, { restaurant: null });
            if (!owner)
                return;
            console.log("deleting ref in admin too....." + owner.username);
            console.log("Successfully deleted....");
            res.json(deletedRestaurant);
        }
        else {
            res.status(500).json({ error: "No such Restaurant" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `Failed to delete ${restName}` });
    }
}));
exports.default = router;
