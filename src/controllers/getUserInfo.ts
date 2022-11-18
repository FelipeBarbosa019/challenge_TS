import UserQueries from "../repository/queries/users/queries";

export async function getUserInfo(req: any, res: any) {
    if (req.cookies.token.admin || req.cookies.token.leader) {
        const getUserInfo = await new UserQueries().getUser(req.params.user_id);
        res.status(200);
        res.send(getUserInfo);
    } else {
        res.status(401).send("Usuário não possui permissão");
    }
}
