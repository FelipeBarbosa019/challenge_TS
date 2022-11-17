import SquadQueries from "../repository/queries/squads/queries";
import { RegexValidator } from "../validators/register";
import { UsersType, QueryResponse, SquadsType } from "../interfaces/interface";

export async function registerSquad(req: any, res: any) {
    if (!new RegexValidator().name(req.body.name)) {
        res.status(500);
        return res.send("Nome inválido");
    }

    if (req.cookies.token.admin) {
        const createSquad: QueryResponse = await new SquadQueries().createSquad(
            req.body.leader,
            req.body.name
        );
        console.log("createSquad: " + createSquad);

        if (createSquad.error) {
            res.status(500).send("Erro, equipe não cadastrada");
        } else {
            res.status(200).send("Equipe criada com sucesso");
        }
        // console.log(createSquad);
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
