"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
require("./mongodb");
const server = (0, express_1.default)();
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./middlewares/auth"));
//Settings
server.set('port', 4200);
//Middlewares
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)('dev'));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use(passport_1.default.initialize());
passport_1.default.use(auth_1.default); //strategy jwt
//Routes
server.get('/', (req, res) => {
    return res.status(200).json({ msg: "Hello Typescript!" });
});
server.use('/users', routes_1.default.user);
server.use('/tasks', routes_1.default.task);
exports.default = server;
