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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const Authenticator_1 = require("../business/services/Authenticator");
const HashManager_1 = require("../business/services/HashManager");
const IdGenerator_1 = require("../business/services/IdGenerator");
const ImageBusiness_1 = require("../business/ImageBusiness");
const ImageDatabase_1 = require("../data/ImageDatabase");
const imageBusiness = new ImageBusiness_1.ImageBusiness(new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager, new Authenticator_1.Authenticator(), new ImageDatabase_1.ImageDatabase());
class ImageController {
    registryImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                const input = {
                    subtitle: req.body.subtitle,
                    author: req.body.author,
                    tags: req.body.tags,
                    file: req.body.file,
                    collection: req.body.collection
                };
                const registry = yield imageBusiness.registryImage(input, authorization);
                res.status(200).send({ registry });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send({ error: error.message });
            }
        });
    }
    getImageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            try {
                const id = req.params.id;
                const image = yield imageBusiness.getImageById(id, authorization);
                res.status(200).send({ image });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send({ error: error.message });
            }
        });
    }
    getAllImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            try {
                const images = yield imageBusiness.getAllImages(authorization);
                res.status(200).send({ images });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send({ error: error.message });
            }
        });
    }
    deleteImageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            try {
                const id = req.params.id;
                yield imageBusiness.deleteImageById(id, authorization);
                res.status(200).send("Imagem excluída com sucesso!");
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send({ error: error.message });
            }
        });
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=ImageController.js.map