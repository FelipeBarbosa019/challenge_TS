import UserQueries from "../repository/queries/users/queries";

export async function getOwnInfo(req: any, res: any) {
    console.log("req.cookies.token: ", req.cookies.token);
    const getUser = await new UserQueries().getUser(req.cookies.token.id);
    console.log("getUser: ", getUser);
    res.status(200).send(getUser);
}
