import SquadQueries from "../repository/queries/squads/queries";

export function deleteSquad(req: any, res: any) {
    // console.log("req.cookies.token.admin: ", req.cookies.token.admin);
    if (req.cookies.token.admin) {
        const deleteSquad = new SquadQueries().deleteSquad(req.params.team_id);
        // console.log("deleteSquad: ", deleteSquad);
        res.status(200);
        res.send("Time deletado com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
