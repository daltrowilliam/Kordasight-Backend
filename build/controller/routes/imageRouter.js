"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = __importDefault(require("express"));
const ImageController_1 = require("../ImageController");
exports.imageRouter = express_1.default.Router();
const imageController = new ImageController_1.ImageController();
exports.imageRouter.post("/registry", imageController.registryImage);
exports.imageRouter.delete("/delete/:id", imageController.deleteImageById);
exports.imageRouter.get("/", imageController.getAllImages);
exports.imageRouter.get("/:id", imageController.getImageById);
//# sourceMappingURL=imageRouter.js.map