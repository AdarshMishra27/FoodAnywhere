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
const middleware_1 = require("../../../middleware");
const db_1 = require("../../../db");
const router = express_1.default.Router();
router.post('/place', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const userId = req.headers._id;
    let totalPrice = 0;
    for (let i = 0; i < body.food.length; i++) {
        const foodItem = body.food[i];
        const food = yield db_1.Food.findById(foodItem);
        const price = food === null || food === void 0 ? void 0 : food.price;
        console.log("ordering: " + (food === null || food === void 0 ? void 0 : food.name) + " {" + (food === null || food === void 0 ? void 0 : food.price) + "}");
        if (price)
            totalPrice += price;
    }
    const username = (_a = (yield db_1.User.findById(userId))) === null || _a === void 0 ? void 0 : _a.username;
    if (!username) {
        console.log("userId given is: " + userId);
        res.status(500).json({ error: "userId in req is invalid" });
        return;
    }
    const orderToBePlaced = {
        restaurant: {
            restaurantId: body.restaurantId,
            food: body.food
        },
        user: {
            name: username,
            address: body.address
        },
        totalPrice
    };
    try {
        const order = yield (new db_1.Order(orderToBePlaced).save());
        yield db_1.User.findByIdAndUpdate(userId, { order: order._id }, { returnDocument: 'after' });
        const hotel = yield db_1.Restaurants.findById(body.restaurantId);
        if (!hotel) {
            res.status(500).json({ error: 'restaurant id does not exist' });
            return;
        }
        yield db_1.Restaurants.findByIdAndUpdate(body.restaurantId, { orders: [...hotel === null || hotel === void 0 ? void 0 : hotel.orders, order._id] });
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'cannot create the order' });
    }
}));
router.get('/get/:orderId', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    try {
        const order = yield db_1.Order.findById(orderId);
        if (!order) {
            res.status(500).json({ error: "no such order exists" });
            return;
        }
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "order fetch failure" });
    }
}));
router.patch('/update/:orderId', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const orderId = req.params.orderId;
    const body = req.body;
    const userId = req.headers._id;
    let totalPrice = 0;
    for (let i = 0; i < body.food.length; i++) {
        const foodItem = body.food[i];
        const food = yield db_1.Food.findById(foodItem);
        const price = food === null || food === void 0 ? void 0 : food.price;
        if (price)
            totalPrice += price;
    }
    const username = (_b = (yield db_1.User.findById(userId))) === null || _b === void 0 ? void 0 : _b.username;
    if (!username) {
        res.status(500).json({ error: "userId in req is invalid" });
        return;
    }
    const updatedOrder = {
        restaurant: {
            restaurantId: body.restaurantId,
            food: body.food
        },
        user: {
            name: username,
            address: body.address
        },
        totalPrice
    };
    try {
        const order = yield db_1.Order.findByIdAndUpdate(orderId, updatedOrder, { returnDocument: "after" });
        if (!order) {
            res.status(500).json({ error: "no such order exists" });
            return;
        }
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "order update failure" });
    }
}));
router.delete('/del/:orderId', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const orderId = req.params.orderId;
    const userId = req.headers['_id'];
    try {
        const order = yield db_1.Order.findByIdAndDelete(orderId);
        if (!order) {
            res.status(500).json({ error: "no such order exists" });
            return;
        }
        yield db_1.User.findByIdAndUpdate(userId, { order: null }, { returnDocument: 'after' });
        const hotel = yield db_1.Restaurants.findById((_c = order.restaurant) === null || _c === void 0 ? void 0 : _c.restaurantId);
        if (!hotel) {
            res.status(500).json({ error: 'restaurant id does not exist' });
            return;
        }
        let idx = -1;
        hotel.orders.filter((o) => {
            return o._id === order._id;
        });
        hotel.orders.splice(idx, 1);
        yield db_1.Restaurants.findByIdAndUpdate((_d = order.restaurant) === null || _d === void 0 ? void 0 : _d.restaurantId, { orders: hotel === null || hotel === void 0 ? void 0 : hotel.orders }, { returnDocument: 'after' });
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "order delete failure" });
    }
}));
exports.default = router;
