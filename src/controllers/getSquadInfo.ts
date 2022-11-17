import SquadQueries from "../repository/queries/squads/queries";

export function getSquadInfo(req: any, res: any) {
    const getSquadInfo =  new SquadQueries().getSquad(req.params.team);
    res.status(200)
    res.send(getSquadInfo);
}