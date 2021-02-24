import express from "express";
import { ImageController } from "../ImageController";


export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post("/registry", imageController.registryImage);
imageRouter.get("/", imageController.getAllImages);
imageRouter.get("/:id", imageController.getImageById);