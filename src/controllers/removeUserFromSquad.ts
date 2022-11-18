import UserQueries from "../repository/queries/users/queries";

export function removeUserFromSquad(req: any, res: any) {
    if (
        req.cookies.token.admin ||
        (req.cookies.token.leader &&
            req.cookies.token.squad == req.params.team_id)
    ) {
        const deleteUserSquad = new UserQueries().removeUserFromSquad(
            req.params.user_id
        );
        res.status(200).send("Usuário deletado do time com sucesso");
    } else {
        res.status(401).send("Usuário não possui permissão");
    }
}
