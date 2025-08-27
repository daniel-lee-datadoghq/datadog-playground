"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = exports.GO_AWAY_ERRORS = exports.initialStreamWindow = exports.STREAM_STATES = exports.FLAGS = exports.TYPES = exports.VERSION = void 0;
exports.VERSION = 0;
var TYPES;
(function (TYPES) {
    TYPES[TYPES["Data"] = 0] = "Data";
    TYPES[TYPES["WindowUpdate"] = 1] = "WindowUpdate";
    TYPES[TYPES["Ping"] = 2] = "Ping";
    TYPES[TYPES["GoAway"] = 3] = "GoAway";
})(TYPES = exports.TYPES || (exports.TYPES = {}));
var FLAGS;
(function (FLAGS) {
    FLAGS[FLAGS["SYN"] = 1] = "SYN";
    FLAGS[FLAGS["ACK"] = 2] = "ACK";
    FLAGS[FLAGS["FIN"] = 4] = "FIN";
    FLAGS[FLAGS["RST"] = 8] = "RST";
})(FLAGS = exports.FLAGS || (exports.FLAGS = {}));
var STREAM_STATES;
(function (STREAM_STATES) {
    STREAM_STATES[STREAM_STATES["Init"] = 0] = "Init";
    STREAM_STATES[STREAM_STATES["SYNSent"] = 1] = "SYNSent";
    STREAM_STATES[STREAM_STATES["SYNReceived"] = 2] = "SYNReceived";
    STREAM_STATES[STREAM_STATES["Established"] = 3] = "Established";
    STREAM_STATES[STREAM_STATES["LocalClose"] = 4] = "LocalClose";
    STREAM_STATES[STREAM_STATES["RemoteClose"] = 5] = "RemoteClose";
    STREAM_STATES[STREAM_STATES["Closed"] = 6] = "Closed";
    STREAM_STATES[STREAM_STATES["Reset"] = 7] = "Reset";
})(STREAM_STATES = exports.STREAM_STATES || (exports.STREAM_STATES = {}));
exports.initialStreamWindow = 256 * 1024;
var GO_AWAY_ERRORS;
(function (GO_AWAY_ERRORS) {
    // goAwayNormal is sent on a normal termination
    GO_AWAY_ERRORS[GO_AWAY_ERRORS["goAwayNormal"] = 0] = "goAwayNormal";
    // goAwayProtoErr sent on a protocol error
    GO_AWAY_ERRORS[GO_AWAY_ERRORS["goAwayProtoErr"] = 1] = "goAwayProtoErr";
    // goAwayInternalErr sent on an internal error
    GO_AWAY_ERRORS[GO_AWAY_ERRORS["goAwayInternalErr"] = 2] = "goAwayInternalErr";
})(GO_AWAY_ERRORS = exports.GO_AWAY_ERRORS || (exports.GO_AWAY_ERRORS = {}));
exports.ERRORS = {
    // ErrInvalidVersion means we received a frame with an
    // invalid version
    errInvalidVersion: new Error('invalid protocol version'),
    // ErrInvalidMsgType means we received a frame with an
    // invalid message type
    errInvalidMsgType: new Error('invalid msg type'),
    // ErrSessionShutdown is used if there is a shutdown during
    // an operation
    errSessionShutdown: new Error('session shutdown'),
    // ErrStreamsExhausted is returned if we have no more
    // stream ids to issue
    // WARNING [Difference with the Go implementation]: not used in the Node.js lib
    errStreamsExhausted: new Error('streams exhausted'),
    // ErrDuplicateStream is used if a duplicate stream is
    // opened inbound
    errDuplicateStream: new Error('duplicate stream initiated'),
    // ErrReceiveWindowExceeded indicates the window was exceeded
    errRecvWindowExceeded: new Error('recv window exceeded'),
    // ErrTimeout is used when we reach an IO deadline
    errTimeout: new Error('i/o deadline reached'),
    // ErrStreamClosed is returned when using a closed stream
    errStreamClosed: new Error('stream closed'),
    // ErrUnexpectedFlag is set when we get an unexpected flag
    errUnexpectedFlag: new Error('unexpected flag'),
    // ErrRemoteGoAway is used when we get a go away from the other side
    errRemoteGoAway: new Error('remote end is not accepting connections'),
    // ErrConnectionReset is sent if a stream is reset. This can happen
    // if the backlog is exceeded, or if there was a remote GoAway.
    errConnectionReset: new Error('connection reset'),
    // ErrConnectionWriteTimeout indicates that we hit the "safety valve"
    // timeout writing to the underlying stream connection.
    errConnectionWriteTimeout: new Error('connection write timeout'),
    // ErrKeepAliveTimeout is sent if a missed keepalive caused the stream close
    errKeepAliveTimeout: new Error('keepalive timeout'),
};
