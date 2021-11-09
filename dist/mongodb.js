"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
mongoose_1.default.connect(config_1.default.database.uri);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Database Connected');
});
connection.once('error', (err) => {
    console.log(err);
    process.exit(1);
});
