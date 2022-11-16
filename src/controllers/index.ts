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
export interface squadsType {
    name: string;
    leader?: number;
}
import { pool } from '../repository/db';
import SquadQueries from '../repository/queries/squads/queries';
import UserQueries from "../repository/queries/users/queries";
import { RegexValidator } from "../validators/register";
const { v4: uuidv4 } = require("uuid");

import {QueryResult} from 'pg'

interface QueryResponse {
    data: QueryResult | string,
    error: any
}


export async function registerUser(req: any, res: any) {
    const sessionID = uuidv4();

    const newUser: usersType = {
        username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        squad: req.body.squad,
        admin: req.body.admin,
        leader: req.body.leader,
        sessionID: sessionID
    };

    const nameValidator = new RegexValidator().name(newUser.first_name + newUser.last_name);
    console.log(nameValidator);

    const emailValidator = new RegexValidator().email(newUser.email);
    console.log(emailValidator);

    const passwordValidator = new RegexValidator().pass(newUser.password);
    console.log(passwordValidator);

    if (
        newUser.username &&
        nameValidator &&
        emailValidator &&
        passwordValidator
    ) {
        res.cookie("token", sessionID,{expire:(Date.now()+3600000)});
        const response : QueryResponse = await new UserQueries().createUser(newUser.username, newUser.email, newUser.first_name, newUser.last_name, newUser.password);
        console.log('Response: ',response)
        res.status(201).send("Usuário " + req.body.username + " cadastrado com sucesso")
    } else {
        res.status(500).send('Falha ao validar os campos')
    }
 
    // console.log(newUser);
    // res.send(newUser);
    // return newUser;
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

export function getOwnInfo(req: any, res: any) {
    const userOwnInfo = new UserQueries().getUser
    // falta especificar como obter no banco de dados o username 
    console.log(userOwnInfo);
    res.status(200)
    res.send(userOwnInfo);
    return userOwnInfo;
}
export function getUserInfo(req: any, res: any) {
    if (!( (new UserQueries().getUser) &&
           (new SquadQueries().getSquad) ))
        { return res.send("Não é usuário administrador e/ou líder!") }
        const userInfo = {
            username: req.param.user_id   // aqui ele deve obter a partir do parametro passado na url
        };
    console.log(userInfo);
    res.status(200)
    res.send(userInfo);
    return userInfo;
}
//   fazer o TRY CATCH para implementar tratamento de erro e requisição condicionada
export function registerSquad(req: any, res: any) {
    const newSquad : squadsType = {
        name: req.body.name,
        leader: req.body.leader,
    };
    const nameValidator = new RegexValidator().name(newSquad.name);
    
    if (!nameValidator) { return res.send("Nome não validado.") }
    if (!(new UserQueries().getUser)) { return res.send("Não é usuário administrador!") }

    console.log(nameValidator, "\n time:", newSquad);
    res.status(201)
    res.send(newSquad);
    return newSquad;
}
export function listUsers(req: any, res: any) {
    const allUsersInfo =  new UserQueries().getAllUsers
    
    console.dir(allUsersInfo);
    res.status(200)
    res.send(allUsersInfo);
    return req.body(allUsersInfo);
}
export function getSquadInfo(req: any, res: any) {
    const squadInfo: squadsType = {
        name: req.param.team,
    };
    
    const querySquad = new SquadQueries().getSquad(req.param.team)

    console.log(squadInfo);
    res.status(200)
    res.send(squadInfo);
    return squadInfo;
}
export function listSquads(req: any, res: any) {
    const allSquadsInfo =  new SquadQueries().getAllSquads
    
    console.dir(allSquadsInfo);
    res.status(200)
    res.send(allSquadsInfo);
    return req.body(allSquadsInfo);
}
