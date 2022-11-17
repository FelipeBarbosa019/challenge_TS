export { getOwnInfo } from "./getOwnInfo";
export { getUserInfo } from "./getUserInfo"
export { listUsers } from "./listUsers"
export { getSquadInfo } from "./getSquadInfo"
export { listSquads } from "./listSquads"
export { registerUser } from "./registerUser"
export { registerSquad } from "./registerSquad"
export { insertUserSquad } from "./insertUserSquad"
export { updateUser } from "./updateUser"
export { updateSquad } from "./updateSquad"
export { deleteUser } from "./deleteUser"
export { deleteSquad } from "./deleteSquad"
export { removeUserFromSquad } from "./removeUserFromSquad"
export { login } from './login'


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

// export function getOwnInfo(req: any, res: any) {
//     const userOwnInfo = new UserQueries().getUser
//     // falta especificar como obter no banco de dados o username 
//     console.log(userOwnInfo);
//     res.status(200)
//     res.send(userOwnInfo);
//     return userOwnInfo;
// }
// export function getUserInfo(req: any, res: any) {
//     if (!( (new UserQueries().getUser) &&
//            (new SquadQueries().getSquad) ))
//         { return res.send("Não é usuário administrador e/ou líder!") }
//         const userInfo = {
//             username: req.param.user_id   // aqui ele deve obter a partir do parametro passado na url
//         };
//     console.log(userInfo);
//     res.status(200)
//     res.send(userInfo);
//     return userInfo;
// }
// //   fazer o TRY CATCH para implementar tratamento de erro e requisição condicionada
// export function registerSquad(req: any, res: any) {
//     const newSquad : SquadsType = {
//         name: req.body.name,
//         leader: req.body.leader,
//     };
//     const nameValidator = new RegexValidator().name(newSquad.name);
    
//     if (!nameValidator) { return res.send("Nome não validado.") }
//     if (!(new UserQueries().getUser)) { return res.send("Não é usuário administrador!") }

//     console.log(nameValidator, "\n time:", newSquad);
//     res.status(201)
//     res.send(newSquad);
//     return newSquad;
// }
// export function getSquadInfo(req: any, res: any) {
//     const squadInfo: SquadsType = {
//         name: req.param.team,
//     };
    
//     const querySquad = new SquadQueries().getSquad(req.param.team)

//     console.log(squadInfo);
//     res.status(200)
//     res.send(squadInfo);
//     return squadInfo;
// }
// export function listSquads(req: any, res: any) {
//     const allSquadsInfo =  new SquadQueries().getAllSquads
    
//     console.dir(allSquadsInfo);
//     res.status(200)
//     res.send(allSquadsInfo);
//     return req.body(allSquadsInfo);
// }