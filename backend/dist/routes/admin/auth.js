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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../db/index");
const config_1 = require("../../config");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!config_1.SECRET)
        return;
    const body = req.body;
    const admin = yield index_1.Admin.findOne({ username: body.username });
    if (!admin) {
        const newAdmin = new index_1.Admin({
            username: body.username,
            password: body.password
        });
        newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ id: newAdmin._id }, config_1.SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "User Created Successfully", token: token });
    }
    else {
        res.status(403).json({ message: "User Already Exists" });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!config_1.SECRET)
        return;
    const { username, password } = req.body;
    const admin = yield index_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, config_1.SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Logged In Successfully", token: token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
exports.default = router;
