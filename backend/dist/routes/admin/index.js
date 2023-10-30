"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./authentication/auth"));
const restaurants_1 = __importDefault(require("./restaurants/restaurants"));
const food_1 = __importDefault(require("./restaurants/food"));
const router = express_1.default.Router();
router.use('/auth', auth_1.default);
router.use('/restaurants', restaurants_1.default);
router.use('/restaurants', food_1.default);
exports.default = router;
