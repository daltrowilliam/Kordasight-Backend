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
exports.ImageDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Image_1 = require("../business/entities/Image");
const CustomError_1 = require("../business/error/CustomError");
class ImageDatabase extends BaseDatabase_1.BaseDatabase {
    static toImageModel(image) {
        return new Image_1.Image(image.id, image.subtitle, image.author, image.date, image.tags, image.file, image.collection);
    }
    registryImage(id, subtitle, author, date, tags, file, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection
                    .insert({
                    id,
                    subtitle,
                    author,
                    date,
                    tags,
                    file,
                    collection
                })
                    .into(ImageDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, "An unexpected error ocurred");
            }
        });
    }
    getImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.BaseDatabase.connection.raw(`
            SELECT * FROM ${ImageDatabase.TABLE_NAME}
            WHERE id = '${id}';
         `);
                return ImageDatabase.toImageModel(result[0][0]);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, "An unexpected error ocurred");
            }
        });
    }
    getAllImages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.BaseDatabase.connection.raw(`
            SELECT * FROM ${ImageDatabase.TABLE_NAME};
         `);
                return result[0];
            }
            catch (error) {
                console.log(error);
                throw new CustomError_1.CustomError(500, "An unexpected error ocurred");
            }
        });
    }
    deleteImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection.raw(`
            DELETE FROM ${ImageDatabase.TABLE_NAME}
            WHERE id = '${id}';
         `);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, "An unexpected error ocurred");
            }
        });
    }
}
exports.ImageDatabase = ImageDatabase;
ImageDatabase.TABLE_NAME = "kordasights_images";
//# sourceMappingURL=ImageDatabase.js.map