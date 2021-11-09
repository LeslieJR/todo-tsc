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
exports.signUp = exports.signIn = void 0;
const models_1 = __importDefault(require("../models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ err: "Email or password are missing" });
        }
        const user = yield models_1.default.user.findOne({ email });
        if (!user) {
            return res.json(400).json({ err: "User does not exist" });
        }
        yield user.comparePassword(password);
        const payload = {
            id: user._id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, {
            expiresIn: "1d"
        });
        return res.status(200).json(token);
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ err: "Email or password are missing" });
        }
        const user = yield models_1.default.user.findOne({ email });
        if (user) {
            return res.json(400).json({ err: "User already exists" });
        }
        const newUser = yield models_1.default.user.create({ email, password });
        return res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
});
exports.signUp = signUp;
