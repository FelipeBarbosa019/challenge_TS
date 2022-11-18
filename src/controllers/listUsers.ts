import UserQueries from "../repository/queries/users/queries";

export async function listUsers(req: any, res: any) {
    if (req.cookies.token.admin) {
        const allUsersInfo = await new UserQueries().getAllUsers();
        res.status(200);
        res.send(allUsersInfo);
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
