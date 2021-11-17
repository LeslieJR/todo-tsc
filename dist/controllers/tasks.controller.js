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
exports.getTask = exports.getAll = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const models_1 = __importDefault(require("../models"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, user_id } = req.body;
        if (!title || !description || !user_id) {
            return res.status(400).json({ err: "Required fields are missing" });
        }
        const user = yield models_1.default.user.findById(user_id);
        if (!user) {
            return res.status(400).json({ err: 'This user does not exist' });
        }
        const task = yield models_1.default.task.create({ title, description, user });
        return res.status(201).json(task);
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.id;
        const { title, description, ready } = req.body;
        //if(!title || !description ||!ready){
        if (!title || !description || (!ready && ready !== false)) {
            return res.status(400).json({ err: "Required fields are missing" });
        }
        const task = yield models_1.default.task.findById(task_id);
        if (!task) {
            return res.status(400).json({ err: 'This task does not exist' });
        }
        task.title = title;
        task.description = description;
        task.ready = ready;
        yield task.save();
        return res.status(200).json(task);
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.id;
        const { user_id } = req.body;
        if (!user_id || !task_id) {
            return res.status(400).json({ err: "Bad request" });
        }
        yield models_1.default.task.findByIdAndRemove(task_id);
        const user = yield models_1.default.user.findById(user_id);
        if (!user) {
            return res.status(400).json({ err: "Bad Request" });
        }
        const tasks = yield models_1.default.task.find({ user });
        return res.status(200).json(tasks);
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
});
exports.deleteTask = deleteTask;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const user = yield models_1.default.user.findById(user_id);
        if (!user) {
            return res.status(400).json({ err: 'This user does not exist' });
        }
        const tasks = yield models_1.default.task.find({ user });
        return res.status(201).json(tasks);
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
});
exports.getAll = getAll;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.id;
        const task = yield models_1.default.task.findById(task_id);
        if (task === null) {
            return res.status(400).json({ err: 'This task does not exist' });
        }
        return res.status(201).json(task);
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
});
exports.getTask = getTask;
