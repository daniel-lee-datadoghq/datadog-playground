export declare const VERSION = 0;
export declare enum TYPES {
    Data = 0,
    WindowUpdate = 1,
    Ping = 2,
    GoAway = 3
}
export declare enum FLAGS {
    SYN = 1,
    ACK = 2,
    FIN = 4,
    RST = 8
}
export declare enum STREAM_STATES {
    Init = 0,
    SYNSent = 1,
    SYNReceived = 2,
    Established = 3,
    LocalClose = 4,
    RemoteClose = 5,
    Closed = 6,
    Reset = 7
}
export declare const initialStreamWindow: number;
export declare enum GO_AWAY_ERRORS {
    goAwayNormal = 0,
    goAwayProtoErr = 1,
    goAwayInternalErr = 2
}
export declare const ERRORS: {
    readonly errInvalidVersion: Error;
    readonly errInvalidMsgType: Error;
    readonly errSessionShutdown: Error;
    readonly errStreamsExhausted: Error;
    readonly errDuplicateStream: Error;
    readonly errRecvWindowExceeded: Error;
    readonly errTimeout: Error;
    readonly errStreamClosed: Error;
    readonly errUnexpectedFlag: Error;
    readonly errRemoteGoAway: Error;
    readonly errConnectionReset: Error;
    readonly errConnectionWriteTimeout: Error;
    readonly errKeepAliveTimeout: Error;
};
