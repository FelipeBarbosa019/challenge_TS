import UserQueries from "../repository/queries/users/queries";
import { QueryResponse } from "../interfaces/interface";

export async function login(req: any, res: any) {
    // console.log("cookies? ", req.cookies);
    if (req.cookies.token) {
        // console.log("inside if cookies");
        let email = req.cookies.token.email;
        let password = req.cookies.token.password;

        if (
            req.cookies.token.email != req.body.email ||
            req.cookie.token.password != req.body.password
        ) {
            email = req.body.email;
            password = req.body.password;
        }

        // // console.log('cookies: ',req.cookies)
        // // console.log("email: ", email);
        // // console.log("pw: ", password);

        const loginQuery: QueryResponse = await new UserQueries().login(
            email,
            password
        );
        // console.log("DATA: ", loginQuery.data);

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
        // // console.log("Entrou no if do req.body");
        const email = req.body.email;
        const password = req.body.password;

        // // console.log("req.body.email? ", req.body.email);
        // // console.log("req.body.password? ", req.body.password);

        const loginQuery: QueryResponse = await new UserQueries().login(
            email,
            password
        );

        // console.log("loginQuery? ", loginQuery);

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
