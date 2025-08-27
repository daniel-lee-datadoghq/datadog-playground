export interface Config {
    acceptBacklog?: number;
    enableKeepAlive?: boolean;
    keepAliveInterval?: number;
    connectionWriteTimeout?: number;
    maxStreamWindowSize?: number;
    logger?: typeof console.log;
}
export declare const defaultConfig: {
    acceptBacklog: number;
    enableKeepAlive: boolean;
    keepAliveInterval: number;
    connectionWriteTimeout: number;
    maxStreamWindowSize: number;
    logger: (message?: any, ...optionalParams: any[]) => void;
};
