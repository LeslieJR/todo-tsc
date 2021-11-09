"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_models_1 = __importDefault(require("./user.models"));
const task_models_1 = __importDefault(require("./task.models"));
exports.default = {
    user: user_models_1.default,
    task: task_models_1.default
};
