import UserQueries from "../repository/queries/users/queries";

export function listUsers(req: any, res: any) {
    if (req.cookies.token.admin) {
        const allUsersInfo = new UserQueries().getAllUsers();
        res.status(200);
        res.send(allUsersInfo);
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
