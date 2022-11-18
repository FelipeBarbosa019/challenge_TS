import UserQueries from "../repository/queries/users/queries";

export function deleteUser(req: any, res: any) {
    if (req.cookies.token.admin) {
        const deleteUser = new UserQueries().deleteUser(req.params.user_id);
        res.status(200).send("Usuário deletado com sucesso");
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
