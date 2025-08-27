"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
class Header {
    constructor(version, type, flags, streamID, length) {
        this.version = version;
        this.type = type;
        this.flags = flags;
        this.streamID = streamID;
        this.length = length;
    }
    static parse(buffer) {
        const version = buffer.readUInt8(0);
        const type = buffer.readUInt8(1);
        const flags = buffer.readUInt16BE(2);
        const streamID = buffer.readUInt32BE(4);
        const length = buffer.readUInt32BE(8);
        return new Header(version, type, flags, streamID, length);
    }
    encode() {
        var header = Buffer.alloc(Header.LENGTH);
        header.writeUInt8(this.version, 0);
        header.writeUInt8(this.type, 1);
        header.writeUInt16BE(this.flags, 2);
        header.writeUInt32BE(this.streamID, 4);
        header.writeUInt32BE(this.length, 8);
        return header;
    }
}
exports.Header = Header;
Header.LENGTH = 12;
