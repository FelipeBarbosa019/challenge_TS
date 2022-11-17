import UserQueries from "../repository/queries/users/queries";
import { QueryResponse } from "../interfaces/interface";

export async function login(req: any, res: any) {
    if (req.cookies) {
        let email = req.cookies.token.email;
        let password = req.cookies.token.password;

        if (req.cookies.token.email != req.body.email) {
            email = req.body.email;
            password = req.body.password;
        }

        // console.log('cookies: ',req.cookies)
        console.log("email: ", email);
        console.log("pw: ", password);

        const loginQuery: QueryResponse = await new UserQueries().login(
            email,
            password
        );
        console.log("DATA: ", loginQuery.data);
        res.status(200)
            .cookie("token", loginQuery.data, {
                expire: Date.now() + 3600000,
            })
            .send("Logado com sucesso.");
    } else {
        res.send("Falha ao logar");
    }
}
