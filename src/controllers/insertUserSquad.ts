import UsersQueries from "../repository/queries/users/queries";

export function insertUserSquad(req: any, res: any) {
    if (
        req.cookies.token.admin ||
        (req.cookies.token.leader &&
            req.cookies.token.squad == req.params.team_id)
    ) {
        new UsersQueries().addUserToSquad(
            req.params.user_id,
            req.params.team_id
        );
        res.status(200);
        res.send("Usuário inserido no time com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
