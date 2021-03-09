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
exports.UserController = void 0;
const Authenticator_1 = require("../business/services/Authenticator");
const HashManager_1 = require("../business/services/HashManager");
const IdGenerator_1 = require("../business/services/IdGenerator");
const UserBusiness_1 = require("../business/UserBusiness");
const UserDatabase_1 = require("../data/UserDatabase");
const userBusiness = new UserBusiness_1.UserBusiness(new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager, new Authenticator_1.Authenticator(), new UserDatabase_1.UserDatabase());
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: req.body.email,
                    name: req.body.name,
                    nickname: req.body.nickname,
                    password: req.body.password,
                };
                const token = yield userBusiness.createUser(input);
                res.status(200).send({ token });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send({ error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = {
                    email: req.body.email,
                    password: req.body.password
                };
                const result = yield userBusiness.login(loginData);
                res.status(200).send({ result });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map