class SquadQueries{
    public async createSquad(_client:any,_leader:number,_squad_name:string):Promise<object>{
        const query = {
            'text': 'INSERT INTO public.squads(leader,name) VALUES($1,$2);',
            'values':[_leader,_squad_name]
        }
        try {
            const res = await _client.query(query);
            return { 
                'data':res,
                'error': null
            };
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
    
    
    public async getSquad(_client:any,_squad_id:number):Promise<object>{
        const query = {
            'text': 'SELECT * FROM squads WHERE ID = $1;',
            'values':[_squad_id]
        }
        try {
            const res = await _client.query(query);
            return { 
                'data':res,
                'error': null
            };
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };

    
    public async getAllSquads(_client:any){
        const query = {
            'text': 'SELECT * FROM squads;'
        }
        try {
            const res = await _client.query(query);
            return { 
                'data':res,
                'error': null
            };
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
    
    
    public async updateSquad(_client:any, _squad_id:number, _leader:number, _squad_name:string):Promise<object>{
        const query = {
            'text': 'UPDATE squads SET leader = $2, name = $3 WHERE id = $1;',
            'values':[_squad_id, _leader, _squad_name]
        }
        try {
            const res = await _client.query(query);
            return { 
                'data':res,
                'error': null
            };
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
    
    
    public async deleteSquad(_client:any,_squad_id:number):Promise<object>{
        const query = {
            'text': 'DELETE FROM squads WHERE ID = $1;',
            'values':[_squad_id]
        }
        try {
            const res = await _client.query(query);
            return { 
                'data':res,
                'error': null
            };
        } catch (error) {
            return {
                'data':'Query failed',
                'error':error
            };
        }
    };
};

export default SquadQueries;