"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const controllers_1 = __importDefault(require("../controllers"));
const router = (0, express_1.Router)();
router.post('/create-task', passport_1.default.authenticate("jwt", { session: false }), controllers_1.default.createTask);
router.get('/all/:user_id', passport_1.default.authenticate("jwt", { session: false }), controllers_1.default.getAll);
router.get('/get/:id', passport_1.default.authenticate("jwt", { session: false }), controllers_1.default.getTask);
router.put('/update/:id', passport_1.default.authenticate("jwt", { session: false }), controllers_1.default.updateTask);
router.delete('/remove/:id', passport_1.default.authenticate("jwt", { session: false }), controllers_1.default.deleteTask);
exports.default = router;
