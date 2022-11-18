// async function update__Squad(req: any, res: any) {
// if (req.cookies.token.id == req.params.user_id) {
//     const oldData = req.cookies.token;

//     const nameValidator = new RegexValidator().name(oldData.name);
//     // console.log(nameValidator);

//     if (!nameValidator.error) {
//           const updateSquad = new SquadQueries().updateSquad(
//               req.params.user_id,
//               oldData.name,
//           );
//     } else {
//           res.status(500).send("Dados incorretos");
//     }
// }
