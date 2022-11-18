import SquadQueries from "../repository/queries/squads/queries";

export async function listSquads(req: any, res: any) {
    if (req.cookies.token.admin) {
        const getAllSquads = await new SquadQueries().getAllSquads();
        res.status(200).send(getAllSquads);
    } else {
        res.status(401).send("Usuário não possui permissão");
    }
}
