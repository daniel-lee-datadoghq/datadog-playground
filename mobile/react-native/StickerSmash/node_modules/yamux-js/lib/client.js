"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const session_1 = require("./session");
class Client extends session_1.Session {
    constructor(config) {
        super(true, config);
    }
}
exports.Client = Client;
