export interface usersType {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    squad: number;
    admin: boolean;
    leader: boolean;
    sessionID: string;
}

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

    console.log(newUser);

    const firstNameValidator = new RegexValidator().name(newUser.first_name);
    console.log(firstNameValidator);

    const lastNameValidator = new RegexValidator().name(newUser.last_name);
    console.log(lastNameValidator);

    const emailValidator = new RegexValidator().email(newUser.email);
    console.log(emailValidator);

    const passwordNameValidator = new RegexValidator().pass(newUser.password);
    console.log(passwordNameValidator);

    // const usernameValidator = new RegexValidator().username(newUser.username);
    // console.log(usernameValidator);

    // console.log(userValidator);
    // if (userValidator) {
    //     res.cookie("token", sessionID);
    // } else {
    //     console.log("Dados inválidos");
    // }

    // console.log(newUser);
    // users.push(object2);
    //foreach para atualizar o cadastro

    return newUser;
    // res.send(object);
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
