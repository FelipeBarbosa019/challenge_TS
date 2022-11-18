import UserQueries from "../repository/queries/users/queries";

export async function getOwnInfo(req: any, res: any) {
    const getUser = await new UserQueries().getUser(req.cookies.token.id);
    res.status(200).send(getUser);
}
