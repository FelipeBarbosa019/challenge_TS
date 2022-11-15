export interface usersType {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    squad?: number;
    admin?: boolean;
    leader?: boolean;
    sessionID?: string;
}
export interface squadsType {
    name: string;
    leader: boolean;
}
import UserQueries from "../repository/queries/users/queries";
import { RegexValidator } from "../validators/register";
const { v4: uuidv4 } = require("uuid");

export function register(req: any, res: any) {
    const sessionID = uuidv4();

    const newUser: usersType = {
        username: req.body.name,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        squad: req.body.squad,
        admin: req.body.admin,
        leader: req.body.leader,
        sessionID: sessionID,
    };

    const firstNameValidator = new RegexValidator().name(newUser.first_name);
    console.log(firstNameValidator);

    const lastNameValidator = new RegexValidator().name(newUser.last_name);
    console.log(lastNameValidator);

    const emailValidator = new RegexValidator().email(newUser.email);
    console.log(emailValidator);

    const passwordValidator = new RegexValidator().pass(newUser.password);
    console.log(passwordValidator);

    if (
        !newUser.username &&
        !firstNameValidator &&
        !lastNameValidator &&
        !emailValidator &&
        !passwordValidator
    ) {
        res.cookie("token", sessionID);
        // new UserQueries().createUser(newUser.username, newUser.email, newUser.first_name, newUser.last_name, newUser.password);
    }

    console.log(newUser);
    res.send(newUser);
    return newUser;
}

// export function login(req: any, res: any) {
//     if (!req.cookies.token) {
//         const check = users.find(
//             (user) =>
//                 user.email === req.body.email &&
//                 user.password === req.body.password
//         );
//         if (!check) {
//             const error = {
//                 Erro: "Email ou senha incorretos",
//             };
//             res.json(error);
//             return;
//         }

//         const sessionID = uuidv4();

//         //foreach para atualizar o cadastro
//         res.cookie("token", sessionID);
//         console.log("Cookies: ", req.cookies.token);
//         res.json({ id: check.id });
//     } else {
//         const check = users.find(
//             (user) => user.sessionID === req.cookies.token
//         );
//         if (!check) {
//             const check2 = users.find(
//                 (user) =>
//                     user.email === req.body.email &&
//                     user.password === req.body.password
//             );
//             if (!check2) {
//                 const error = {
//                     Erro: "Email ou senha incorretos",
//                 };
//                 res.json(error);
//                 return;
//             }

//             const sessionID = uuidv4();

//             //foreach para atualizar o cadastro
//             res.cookie("token", sessionID);
//             console.log("Cookies: ", req.cookies.token);
//             res.json({ id: check2.id });
//             return;
//         }
//         res.json({ id: check.id });
//     }
// }

// export function update(req: any, res: any) {
//     const object = {
//         email: req.body.email,
//         name: req.body.name,
//         pass: req.body.pass,
//     };

//     users.forEach((element) => {
//         if (req.cookies.token === element.sessionID) {
//             element.name = object.name;
//             element.email = object.email;
//             res.send(element);
//         }
//     });
// }
export function registerSquad(req: any, res: any) {
    if (!(new UserQueries().getUser)) { return res.send("Não é usuário administrador!") }
    const newSquad : squadsType = {
            name: req.body.name,
            leader: req.body.leader,
        };

    const nameValidator = new RegexValidator().name(newSquad.name);
    console.log(nameValidator, "\n time:", newSquad);
    res.send(newSquad);
    return newSquad;
}
