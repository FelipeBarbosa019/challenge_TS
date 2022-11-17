import SquadQueries from "../repository/queries/squads/queries";

export function deleteSquad(req: any, res: any) {
    if(req.cookies.admin) {
        const deleteSquad =  new SquadQueries().deleteSquad(req.params.user_id)
        res.status(200)
        res.send("Time deletado com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}