"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const tasks_controller_1 = require("./tasks.controller");
exports.default = {
    signUp: user_controller_1.signUp,
    signIn: user_controller_1.signIn,
    createTask: tasks_controller_1.createTask,
    updateTask: tasks_controller_1.updateTask,
    deleteTask: tasks_controller_1.deleteTask,
    getAll: tasks_controller_1.getAll,
    getTask: tasks_controller_1.getTask
};
