import UserQueries from "../repository/queries/users/queries";

export function getOwnInfo(req: any, res: any) {
    const getUser = new UserQueries().getUser(req.cookies.id)
    res.status(200)
    res.send(getUser)
}