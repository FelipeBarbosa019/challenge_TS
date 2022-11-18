
import SquadQueries from "../repository/queries/squads/queries";
import { RegexValidator } from "../validators/register";

export async function updateSquad(req: any, res: any) {
if (req.cookies.token.admin || req.cookies.token.leader) {
    const oldData = req.cookies.token;

    const nameValidator = new RegexValidator().name(oldData.name);
    console.log(nameValidator);

    if (!nameValidator.error) {
        // const updateSquad = 
        //  Accept-Patch: application/merge-patch+json 
        await new SquadQueries().updateSquad(
            req.params.squad_id,
            oldData.name,
            oldData.old_leader,
            req.body.leader
        );
        res.status(204);
        // res.send(updateSquad);
    } else {
          res.status(500).send("Dados incorretos");
    }
} else { res.status(500).send("Usuário não possui permissão") }
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
