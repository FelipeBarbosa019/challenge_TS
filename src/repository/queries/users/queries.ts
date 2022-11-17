import { pool } from "../../db";
import {
    UsersType,
    QueryResponse,
    SquadsType,
} from "../../../interfaces/interface";

class UserQueries {
    public async createUser(
        _user_name: string,
        _email: string,
        _first_name: string,
        _last_name: string,
        _password: string
    ): Promise<QueryResponse> {
        const query = {
            text: "INSERT INTO users(user_name, email, first_name, last_name, password) VALUES($1,$2,$3,$4,$5) RETURNING *;",
            values: [_user_name, _email, _first_name, _last_name, _password],
        };
        try {
            const res = await pool.query(query.text, query.values);
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

    public async verify(_email: string): Promise<QueryResponse> {
        const query = {
            text: "SELECT * FROM users WHERE email = $1;",
            values: [_email],
        };
        try {
            const res = await pool.query(query.text, query.values);
            return {
                data: res.rows[0],
                error: null,
            };
        } catch (error) {
            return {
                data: "Query not found user",
                error: error,
            };
        }
    }

    public async login(
        _email: string,
        _password: string
    ): Promise<QueryResponse> {
        const query = {
            text: "SELECT * FROM users WHERE (email = $1 AND password = $2);",
            values: [_email, _password],
        };
        try {
            const res = await pool.query(query.text, query.values);

            if (true) {
                return {
                    data: res.rows[0],
                    error: null,
                };
            }
        } catch (error) {
            return {
                data: "Query not found user",
                error: error,
            };
        }
    }

    public async getUser(_id: number): Promise<QueryResponse> {
        const query = {
            text: "SELECT * FROM users WHERE id = $1;",
            values: [_id],
        };
        try {
            const res = await pool.query(query.text, query.values);

            if (res.rows.length == 0) {
                return {
                    data: "User not found",
                    error: "User not found",
                };
            } else {
                return {
                    data: res.rows[0],
                    error: null,
                };
            }
        } catch (error) {
            return {
                data: "Query not found user",
                error: error,
            };
        }
    }

    public async getAllUsers() {
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
    ): Promise<QueryResponse> {
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
            const res = await pool.query(query.text, query.values);
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
    ): Promise<QueryResponse> {
        const query = {
            text: "UPDATE users SET squad = $2 WHERE id = $1 AND leader = false RETURNING *;",
            values: [_id, _squad],
        };
        try {
            console.log("user: ", _id);
            console.log("squad: ", _squad);
            const res = await pool.query(query.text, query.values);
            console.log("addUserToSquad res: ", res.rows);
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

    public async removeUserFromSquad(_id: number): Promise<QueryResponse> {
        const query = {
            text: "UPDATE users SET squad = NULL WHERE id = $1 RETURNING *;",
            values: [_id],
        };
        try {
            const res = await pool.query(query.text, query.values);
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

    public async deleteUser(_id: number): Promise<QueryResponse> {
        const query = {
            text: "DELETE FROM users WHERE id = $1 RETURNING *;",
            values: [_id],
        };
        try {
            const res = await pool.query(query.text, query.values);
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

export default UserQueries;

// protected async tryCatch(query?: any) {
//     try {
//         const res = await pool.query(query.text, query.values);
//         return {
//             data: res.rows[0],
//             error: null,
//         };
//     } catch (error) {
//         return {
//             data: "Query failed",
//             error: error,
//         };
//     }
// }
