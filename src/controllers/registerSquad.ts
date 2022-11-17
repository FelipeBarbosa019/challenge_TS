import SquadQueries from "../repository/queries/squads/queries";
import { RegexValidator } from "../validators/register";

export function registerSquad(req: any, res: any) {

    if(!new RegexValidator().name(req.body.name)) {
        res.status(500)
        return res.send("Nome inválido")
    }
  
    if(req.cookies.admin) {
        const createSquad =  new SquadQueries().createSquad(req.body.leader, req.body.name);
        res.status(200)
        res.send("Time criado com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}


