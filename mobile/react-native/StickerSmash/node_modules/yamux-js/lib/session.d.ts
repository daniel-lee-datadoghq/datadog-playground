/// <reference types="node" />
import { Duplex, Transform, TransformCallback } from 'stream';
import { Header } from './header';
import { Config, defaultConfig } from './mux';
import { Stream } from './stream';
export declare class Session extends Transform {
    private localGoaway;
    private remoteGoAway;
    private nextStreamID;
    config: typeof defaultConfig;
    private pings;
    private pingID;
    private pingTimer?;
    private streams;
    private shutdown;
    protected onStream?: (duplex: Duplex) => void;
    private currentHeader?;
    constructor(client: boolean, config?: Config, onStream?: (duplex: Duplex) => void);
    _transform(chunk: any, encoding: BufferEncoding, cb: TransformCallback): void;
    private handleStreamMessage;
    closeStream(streamID: number): void;
    isClosed(): boolean;
    close(error?: Error): void;
    private incomingStream;
    private goAway;
    open(): Stream;
    private handlePing;
    private ping;
    private keepalive;
    send(header: Header, data?: Buffer): void;
    private handleGoAway;
}
