import { pool } from '../repository/db';
import SquadQueries from '../repository/queries/squads/queries';
import UserQueries from "../repository/queries/users/queries";
import { RegexValidator } from "../validators/register";
import { UsersType, QueryResponse, SquadsType } from '../interfaces/interface';
const { v4: uuidv4 } = require("uuid");

export async function registerUser(req: any, res: any) {
    const sessionID = uuidv4();

    const newUser: UsersType = {
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

    console.log('Cookies do Front: ', req.cookies)

    if((await new UserQueries().verify(newUser.email)).data) {
        if (
            newUser.username &&
            nameValidator &&
            emailValidator &&
            passwordValidator
        ) {
            const response : QueryResponse = await new UserQueries().createUser(newUser.username, newUser.email, newUser.first_name, newUser.last_name, newUser.password);
            res.cookie("token", response.data, {expire:(Date.now()+3600000)});
            // console.log('Response.data: ', response.data)
            // console.log('Cookies enviados de volta: ',res.cookies)
            res.status(201).send("Usuário " + req.body.username + " cadastrado com sucesso")
        } else {
            res.status(500).send('Falha ao validar os campos')
        } 
    } else{
        res.send("Usuário já cadastrado")
    }
}