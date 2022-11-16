// require("dotenv").config();
// const { pool } = require("pg");
// const pool = new pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
// });

import { pool } from "../../db";
import {QueryResult} from 'pg'

interface QueryResponse {
    data: QueryResult | string,
    error: any
}

class UserQueries{
    public async createUser(
        _user_name: string,
        _email: string,
        _first_name: string,
        _last_name: string,
        _password: string
    )  {
        const query = {
            text: "INSERT INTO public.users(user_name, email, first_name, last_name, password) VALUES($1,$2,$3,$4,$5) RETURNING *;",
            values: [_user_name, _email, _first_name, _last_name, _password],
        };
        try {
            const res = await pool.query(query.text,query.values);
            return {
                data: res.rows[0],
                error: null,
            };
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    public async getUser(_id: number) {
        const query = {
            text: "SELECT * FROM public.users WHERE id = $1;",
            values: [_id],
        };
        try {
            const res = await pool.query(query.text,query.values);
            if (res.rows.length == 0) {
                throw new Error(
                    "T H R O W   E R R O R ! ! ! Nenhum usuário encontrado."
                ); // T H R O W   E R R O R // T H R O W   E R R O R // T H R O W   E R R O R // T H R O W   E R R O R //
            }
        } catch (error) {
            return {
                data: "Query not found user",
                error: error,
            };
        }
    }

    public async getAllUsers(): Promise<object> {
        const query = {
            text: "SELECT * FROM users;",
        };
        try {
            const res = await pool.query(query.text);
            return {
                data: res.rows,
                error: null,
            };
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    public async updateUser(
        _id: number,
        _user_name: string,
        _email: string,
        _first_name: string,
        _last_name: string,
        _password: string
    ): Promise<object> {
        const query = {
            text: "UPDATE users SET user_name = $2, email = $3, first_name = $4, last_name = $5, password = $6 WHERE id = $1 RETURNING *;",
            values: [
                _id,
                _user_name,
                _email,
                _first_name,
                _last_name,
                _password,
            ],
        };
        try {
            const res = await pool.query(query.text,query.values);
            return {
                data: res.rows[0],
                error: null,
            };
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    public async addUserToSquad(
        _id: number,
        _squad: number
    ): Promise<object> {
        const query = {
            text: "UPDATE users SET squad = $2 WHERE id = $1 RETURNING *;",
            values: [_id, _squad],
        };
        try {
            const res = await pool.query(query.text,query.values);
            return {
                data: res.rows[0],
                error: null,
            };
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    public async removeUserFromSquad(
        _id: number
    ): Promise<object> {
        const query = {
            text: "UPDATE users SET squad = NULL WHERE id = $1 RETURNING *;",
            values: [_id],
        };
        try {
            const res = await pool.query(query.text,query.values);
            return {
                data: res.rows[0],
                error: null,
            };
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    public async deleteUser(_id: number): Promise<object> {
        const query = {
            text: "DELETE FROM public.users WHERE id = $1 RETURNING *;",
            values: [_id],
        };
        try {
            const res = await pool.query(query.text,query.values);
            return {
                data: res.rows[0],
                error: null,
            };
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    protected async tryCatch(query?: any): Promise<object>  {
        try {
            const res = await pool.query(query.text,query.values);
            return {
                data: res.rows[0],
                error: null,
            };
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }
}


export default UserQueries

