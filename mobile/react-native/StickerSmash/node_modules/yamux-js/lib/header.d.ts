/// <reference types="node" />
export declare class Header {
    version: number;
    type: number;
    flags: number;
    streamID: number;
    length: number;
    static LENGTH: number;
    constructor(version: number, type: number, flags: number, streamID: number, length: number);
    static parse(buffer: Buffer): Header;
    encode(): Buffer;
}
