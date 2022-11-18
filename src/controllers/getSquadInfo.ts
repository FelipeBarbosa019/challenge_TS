import SquadQueries from "../repository/queries/squads/queries";

export async function getSquadInfo(req: any, res: any) {
    if (req.cookies.token) {
        const getSquadInfo = await new SquadQueries().getSquad(req.params.team);

        if (!getSquadInfo.error) {
            res.status(200).send(getSquadInfo.data);
        }
    } else {
        res.status(403).send("Faça o login");
    }
}
