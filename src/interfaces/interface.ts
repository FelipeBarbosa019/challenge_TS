import { QueryResult } from "pg";

export interface UsersType {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    squad: number;
    admin: boolean;
    leader: boolean;
    sessionID: string;
}

export interface SquadsType {
    name: string;
    leader?: number;
}

export interface QueryResponse {
    data: QueryResult | string;
    error: any;
}
