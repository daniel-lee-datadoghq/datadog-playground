/// <reference types="node" />
import { Duplex } from 'stream';
import { STREAM_STATES } from './constants';
import { Header } from './header';
import { Session } from './session';
export declare class Stream extends Duplex {
    private recvWindow;
    private sendWindow;
    private id;
    private session;
    private state;
    private recvBuf?;
    private controlHdr?;
    constructor(session: Session, id: number, state: STREAM_STATES);
    ID(): number;
    _read(size: number): void;
    _write(chunk: any, encoding: BufferEncoding, cb: (error?: Error | null) => void): void;
    private sendFlags;
    sendWindowUpdate(): void;
    updateRecvWindow(receivedSize: number): void;
    private sendClose;
    close(): void;
    forceClose(): void;
    private processFlags;
    incrSendWindow(hdr: Header): void;
}
