import { pool } from "../../db";

class SquadQueries{
    public async createSquad(_leader:number,_squad_name:string):Promise<object>{
        const query1 = {
            'text': 'INSERT INTO public.squads(leader,name) VALUES($1,$2) RETURNING *;',
            'values':[_leader,_squad_name]
        }
        const query2 = {
            'text':'UPDATE users SET squad = $2, leader = true WHERE id = $1'
        }
        try {
            await pool.query('begin;')
            const res1 = await pool.query(query1.text,query1.values);
            const res2 = await pool.query(query2.text,[_leader,res1.rows[0].id])
            if (res1.rows[0] && res2.rows[0]){
                await pool.query('commit;')
                return { 
                    data: res1.rows[0],
                    'error': null
                };
            } else {
                await pool.query('rollback;')
                return {
                    'data':'Transaction query failed',
                    'error':'Transaction Failed'
                }
            }
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
    
    
    public async getSquad(_squad_id:number):Promise<object> {
        const query = {
            'text': 'SELECT * FROM squads WHERE ID = $1;',
            'values':[_squad_id]
        }
        try {
            const res = await pool.query(query.text,query.values);
            return { 
                data: res.rows[0],
                'error': null
            };
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };

    
    public async getAllSquads(){
        const query = {
            'text': 'SELECT * FROM squads;'
        }
        try {
            const res = await pool.query(query.text);
            return { 
                data: res.rows,
                'error': null
            };
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
    
    
    public async updateSquad(_squad_id:number,_old_leader:number, _new_leader:number, _squad_name:string):Promise<object>{
        const query1 = {
            'text': 'UPDATE squads SET leader = $2, name = $3 WHERE id = $1 RETURNING *;',
            'values':[_squad_id, _new_leader, _squad_name]
        }
        const query2 = {
            'text':'UPDATE users SET leader = false WHERE id = $1',
            'values':[_old_leader]
        }
        const query3 = {
            'text':'UPDATE users SET leader = true WHERE id = $1',
            'values':[_new_leader]
        }
        try {
            const begin = await pool.query('begin;')
            const res1 = await pool.query(query1.text,query1.values);
            const res2 = await pool.query(query2.text,query2.values);
            const res3 = await pool.query(query3.text,query3.values);
            if (res1.rows[0] || res2.rows[0] || res3.rows[0]) {
                const commit = await pool.query('commit;')
                return { 
                    data: res1.rows[0],
                    'error': null
                };
            } else {
                await pool.query('rollback;')
                return {
                    'data':'Transaction query failed',
                    'error':'Transaction failed'
                };
            }
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
    
    
    public async deleteSquad(_squad_id:number):Promise<object>{
        const query1 = {
            'text': 'UPDATE users SET squad = null, leader = false WHERE squad = $1;',
            'values':[_squad_id]
        }
        const query2 = {
            'text': 'DELETE FROM squads WHERE ID = $1 RETURNING *;',
            'values':[_squad_id]
        }
        try {
            await pool.query('begin;')
            const res1 = await pool.query(query1.text,query1.values);
            const res2 = await pool.query(query2.text,query2.values);

            if (res1.rows[0] && res2.rows[0]) {
                await pool.query('commit;')
                return { 
                    data: res2.rows[0],
                    'error': null
                };
            } else {
                await pool.query('rollback;')
                return { 
                    'data': 'Transaction query failed',
                    'error': 'Transaction Failed'
                };
            }
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
};

export default SquadQueries;