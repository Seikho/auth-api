
export function login(username: string, password: string): Promise<string>;
export function register(user: User): Promise<number>;
export function verify(token: string): Promise<boolean>;
export function startWebServer(port?: number): void;

export interface User {
    username: string;
    password: string;
    enabled?: number;
}

export interface Login {
    username: string;
    password: string;
}

export interface Payload {
    guid: string;
}

export interface Session {
    token: string;
    username: string;
    guid: string;
}

