import UserQueries from "../repository/queries/users/queries";
import { QueryResponse } from "../interfaces/interface";

export async function login(req: any, res: any) {
    if (req.cookies.token) {
        let email = req.cookies.token.email;
        let password = req.cookies.token.password;
        if (
            req.cookies.token.email != req.body.email ||
            req.cookie.token.password != req.body.password
        ) {
            email = req.body.email;
            password = req.body.password;
        }

        const loginQuery: QueryResponse = await new UserQueries().login(
            email,
            password
        );

        if (!loginQuery.error) {
            res.status(200)
                .cookie("token", loginQuery.data, {
                    expire: Date.now() + 3600000,
                })
                .send("Logado com sucesso.");
        } else {
            res.status(403).send("Falha na autenticação via cookie");
        }
    } else if (req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;

        const loginQuery: QueryResponse = await new UserQueries().login(
            email,
            password
        );

        if (!loginQuery.error) {
            res.status(200)
                .cookie("token", loginQuery.data, {
                    expire: Date.now() + 3600000,
                })
                .send("Logado com sucesso.");
        } else {
            res.status(403).send("Falha na autenticação");
        }
    } else {
        res.status(400).send("Falha ao logar");
    }
}
