import SquadQueries from "../repository/queries/squads/queries";

export function listSquads(req: any, res: any) {
    if(req.cookies.admin) {
        const getAllSquads =  new SquadQueries().getAllSquads()
        res.status(200)
        res.send(getAllSquads);
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}