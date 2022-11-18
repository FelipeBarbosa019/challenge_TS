import SquadQueries from "../repository/queries/squads/queries";

export function deleteSquad(req: any, res: any) {
    if (req.cookies.token.admin) {
        const deleteSquad = new SquadQueries().deleteSquad(req.params.team_id);
        res.status(200).send("Time deletado com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
