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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../business/entities/User");
const CustomError_1 = require("../business/error/CustomError");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    static toUserModel(user) {
        return user && new User_1.User(user.id, user.name, user.email, user.nickname, user.password);
    }
    createUser(id, email, name, nickname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection
                    .insert({
                    id,
                    email,
                    name,
                    nickname,
                    password
                })
                    .into(UserDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, "An unexpected error ocurred");
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.BaseDatabase.connection
                    .select("*")
                    .from(UserDatabase.TABLE_NAME)
                    .where({ email });
                return UserDatabase.toUserModel(result[0]);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, "An unexpected error ocurred");
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "kordasights_users";
//# sourceMappingURL=UserDatabase.js.map