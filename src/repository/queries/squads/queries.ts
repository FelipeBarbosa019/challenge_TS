import { pool } from "../../db";
import {
    UsersType,
    QueryResponse,
    SquadsType,
} from "../../../interfaces/interface";

class SquadQueries {
    public async createSquad(
        _leader: number,
        _squad_name: string
    ): Promise<QueryResponse> {
        const query = {
            text1: "INSERT INTO squads(leader,name) VALUES($1,$2) RETURNING *;",
            text2: "UPDATE users SET squad = $2, leader = true WHERE id = $1 RETURNING *;",
            values: [_leader, _squad_name],
        };
        try {
            await pool.query("begin;");
            const res1 = await pool.query(query.text1, query.values);

            // // console.log("res1: ", res1.rows);
            const res2 = await pool.query(query.text2, [
                _leader,
                res1.rows[0].id,
            ]);
            // // console.log("res2: ", res2.rows);
            if (res1.rows[0] && res2.rows[0]) {
                await pool.query("commit;");
                return {
                    data: res1.rows[0],
                    error: null,
                };
            } else {
                await pool.query("rollback;");
                return {
                    data: "Transaction query failed",
                    error: "Transaction Failed",
                };
            }
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    public async getSquad(_squad_id: number): Promise<QueryResponse> {
        const query = {
            text: "SELECT * FROM squads WHERE ID = $1;",
            values: [_squad_id],
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

    public async getAllSquads() {
        const query = {
            text: "SELECT * FROM squads;",
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

    public async updateSquad(
        _squad_id: number,
        _old_leader: number,
        _new_leader: number,
        _squad_name: string
    ): Promise<QueryResponse> {
        const query = {
            text1: "UPDATE squads SET leader = $2, name = $3 WHERE id = $1 RETURNING *;",
            text2: "UPDATE users SET leader = false WHERE id = $1",
            text3: "UPDATE users SET leader = true WHERE id = $1",
            values1: [_squad_id, _new_leader, _squad_name],
            values2: [_old_leader],
            values3: [_new_leader],
        };
        try {
            const begin = await pool.query("begin;");
            const res1 = await pool.query(query.text1, query.values1);
            const res2 = await pool.query(query.text2, query.values2);
            const res3 = await pool.query(query.text3, query.values3);
            if (res1.rows[0] || res2.rows[0] || res3.rows[0]) {
                const commit = await pool.query("commit;");
                return {
                    data: res1.rows[0],
                    error: null,
                };
            } else {
                await pool.query("rollback;");
                return {
                    data: "Transaction query failed",
                    error: "Transaction failed",
                };
            }
        } catch (error) {
            return {
                data: "Query failed",
                error: error,
            };
        }
    }

    public async deleteSquad(_squad_id: number): Promise<QueryResponse> {
        // console.log("deleteSquad was called");
        const query = {
            text1: "UPDATE users SET squad = null, leader = false WHERE squad = $1 RETURNING *;",
            text2: "DELETE FROM squads WHERE ID = $1 RETURNING *;",
            values: [_squad_id],
        };
        try {
            // console.log("start of try catch");
            await pool.query("begin;");
            const res1 = await pool.query(query.text1, query.values);
            // console.log("deleteSquad res1: ", res1.rows);
            const res2 = await pool.query(query.text2, query.values);
            // console.log("deleteSquad res2: ", res2.rows);

            if (res1.rows[0] && res2.rows[0]) {
                await pool.query("commit;");
                return {
                    data: res2.rows[0],
                    error: null,
                };
            } else {
                await pool.query("rollback;");
                return {
                    data: "Transaction query failed",
                    error: "Transaction Failed",
                };
            }
        } catch (error) {
            // console.log("deleteSquad error log: ", error);
            return {
                data: "Query failed",
                error: error,
            };
        }
    }
}

export default SquadQueries;
