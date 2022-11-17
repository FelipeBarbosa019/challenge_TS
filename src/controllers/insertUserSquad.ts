import UsersQueries from "../repository/queries/users/queries";

export function insertUserSquad(req: any, res: any) {
    if(req.cookies.admin || req.cookies.leader) {
        const insertUserSquad =  new UsersQueries().addUserToSquad(req.body.user_id, req.body.team_id)
        res.status(200)
        res.send("Usuário inserido no time com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}