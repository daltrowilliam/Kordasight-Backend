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
exports.UserBusiness = void 0;
const CustomError_1 = require("./error/CustomError");
class UserBusiness {
    constructor(idGenerator, hashManager, authenticator, userDatabase) {
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.userDatabase = userDatabase;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.name ||
                !user.email ||
                !user.password ||
                !user.nickname) {
                throw new CustomError_1.CustomError(400, "'name', 'email', 'password' and 'nickname', must be informed!");
            }
            if (user.password.length < 6) {
                throw new CustomError_1.CustomError(400, "Your password must have 6 characters at least");
            }
            if (user.email.indexOf("@") === -1) {
                throw new CustomError_1.CustomError(400, "Invalid email");
            }
            const userFromDB = yield this.userDatabase.getUserByEmail(user.email);
            if (userFromDB) {
                throw new CustomError_1.CustomError(400, "Email already exist!");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(user.password);
            yield this.userDatabase.createUser(id, user.email, user.name, user.nickname, hashPassword);
            const accessToken = this.authenticator.generateToken({
                id
            });
            return accessToken;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.email || !user.password) {
                throw new CustomError_1.CustomError(400, "'email' and 'password' must be informed!");
            }
            const userFromDB = yield this.userDatabase.getUserByEmail(user.email);
            if (!userFromDB) {
                throw new CustomError_1.CustomError(404, "User Not Found!");
            }
            const passwordIsCorrect = yield this.hashManager.compare(user.password, userFromDB.password);
            if (!passwordIsCorrect) {
                throw new CustomError_1.CustomError(401, "Invalid credentials!");
            }
            const accessToken = this.authenticator.generateToken({
                id: userFromDB.id
            });
            const username = userFromDB.name;
            return { accessToken, username };
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map