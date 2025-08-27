"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const session_1 = require("./session");
class Server extends session_1.Session {
    constructor(onStream, config) {
        super(false, config, onStream);
    }
}
exports.Server = Server;
