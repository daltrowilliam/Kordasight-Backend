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
exports.ImageBusiness = void 0;
const CustomError_1 = require("./error/CustomError");
const getCreatedDate_1 = require("./services/getCreatedDate");
class ImageBusiness {
    constructor(idGenerator, hashManager, authenticator, imageDatabase) {
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.imageDatabase = imageDatabase;
    }
    registryImage(image, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = this.authenticator.getData(authorization);
            if (!tokenData) {
                throw new CustomError_1.CustomError(403, "Invalid Token");
            }
            if (!image.subtitle ||
                !image.author ||
                !image.tags ||
                !image.file ||
                !image.collection) {
                throw new CustomError_1.CustomError(400, "'subtitle', 'author', 'tags', 'file' and 'collection' must be informed!");
            }
            const id = this.idGenerator.generate();
            const date = getCreatedDate_1.getCreatedDate(1);
            yield this.imageDatabase.registryImage(id, image.subtitle, image.author, date, image.tags, image.file, image.collection);
            return "Registry Done!";
        });
    }
    getImageById(id, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = this.authenticator.getData(authorization);
            if (!tokenData) {
                throw new CustomError_1.CustomError(403, "Invalid Token");
            }
            const image = yield this.imageDatabase.getImageById(id);
            if (!image) {
                throw new CustomError_1.CustomError(404, "Image Not Found!");
            }
            return image;
        });
    }
    deleteImageById(id, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = this.authenticator.getData(authorization);
            if (!tokenData) {
                throw new CustomError_1.CustomError(403, "Invalid Token");
            }
            const image = yield this.imageDatabase.getImageById(id);
            if (!image) {
                throw new CustomError_1.CustomError(404, "Image Not Found!");
            }
            yield this.imageDatabase.deleteImageById(id);
        });
    }
    getAllImages(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = this.authenticator.getData(authorization);
            if (!tokenData) {
                throw new CustomError_1.CustomError(403, "Invalid Token");
            }
            const images = yield this.imageDatabase.getAllImages();
            if (!images) {
                throw new CustomError_1.CustomError(404, "Image Not Found!");
            }
            return images;
        });
    }
}
exports.ImageBusiness = ImageBusiness;
//# sourceMappingURL=ImageBusiness.js.map