import UserQueries from "../repository/queries/users/queries";

export function getUserInfo(req: any, res: any) {
    if(req.cookies.admin || req.cookies.leader) {
        const getUserInfo =  new UserQueries().getUser(req.params.user_id)
        res.status(200)
        res.send(getUserInfo);
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}