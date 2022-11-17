import UserQueries from "../repository/queries/users/queries";

export function removeUserFromSquad(req: any, res: any) {
    if(req.cookies.admin || req.cookies.leader) {
        const deleteUserSquad =  new UserQueries().removeUserFromSquad(req.params.user_id)
        res.status(200)
        res.send("Usuário deletado do time com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}