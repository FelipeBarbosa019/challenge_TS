import SquadQueries from "../repository/queries/squads/queries";
import { RegexValidator } from "../validators/register";

export async function updateSquad(req: any, res: any) {
    if (
        req.cookies.token.admin ||
        (req.cookies.token.leader &&
            req.cookies.token.squad == req.params.team_id)
    ) {
        const nameValidator = new RegexValidator().name(req.body.name);
        console.log(nameValidator);

        if (!nameValidator.error) {
            // const updateSquad =
            //  Accept-Patch: application/merge-patch+json
            const updateSquadQuery = await new SquadQueries().updateSquad(
                req.params.team_id,
                req.body.old_leader,
                req.body.new_leader,
                req.body.squad_name
            );

            if (!updateSquadQuery.error) {
                res.status(200).send(
                    `Equipe ${req.params.team_id} teve líder alterado de ${req.body.old_leader} para ${req.body.new_leader}`
                );
            } else {
                res.status(500).send("Erro na query updateSquad");
            }
        } else {
            res.status(400).send("Dados incorretos");
        }

    } else {
        res.status(403).send("Usuário não possui permissão");
    }
}

//  if (
//      cookie?admin ||
//      cookie?leader && cookie.squad = req.params.teams_id
//  )

// begin;
//     update table squad set leader = $1 where id = $2;
//     update table users set leader = false where id = $3;
//     update table users set leader = true where id = $4;
// commit;
