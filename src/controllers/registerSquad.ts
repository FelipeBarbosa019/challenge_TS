import { QueryResponse } from "../interfaces/interface";
import SquadQueries from "../repository/queries/squads/queries";
import { RegexValidator } from "../validators/register";

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

        if (createSquad.error) {
            res.status(500).send("Erro, equipe não cadastrada");
        } else {
            res.status(200).send("Equipe criada com sucesso");
        }
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
