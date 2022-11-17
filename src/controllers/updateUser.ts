import UserQueries from "../repository/queries/users/queries";
import { RegexValidator } from "../validators/register";

export async function updateUser(req: any, res: any) {
    if (req.cookies.token.id == req.params.user_id) {
        const oldData = req.cookies.token;

        if (req.body.email) {
            const uniqueEmailCheck = await new UserQueries().verify(
                req.body.email
            );

            if (!uniqueEmailCheck.error) {
                Object.keys(req.body).forEach((key) => {
                    oldData[key] = req.body[key];
                });

                const nameValidator = new RegexValidator().name(
                    oldData.first_name + oldData.last_name
                );
                console.log(nameValidator);

                const emailValidator = new RegexValidator().email(
                    oldData.email
                );
                console.log(emailValidator);

                const passwordValidator = new RegexValidator().pass(
                    oldData.password
                );
                console.log(passwordValidator);

                if (
                    !nameValidator.error &&
                    !emailValidator.error &&
                    !passwordValidator.error
                ) {
                    const updateUser = new UserQueries().updateUser(
                        req.params.user_id,
                        oldData.username,
                        oldData.email,
                        oldData.first_name,
                        oldData.last_name,
                        oldData.password
                    );
                } else {
                    res.status(500).send("Dados incorretos");
                }
            } else {
                res.status(500).send("Email já cadastrado");
            }
        } else {
            Object.keys(req.body).forEach((key) => {
                oldData[key] = req.body[key];
            });

            const nameValidator = new RegexValidator().name(
                oldData.first_name + oldData.last_name
            );
            console.log(nameValidator);

            const emailValidator = new RegexValidator().email(oldData.email);
            console.log(emailValidator);

            const passwordValidator = new RegexValidator().pass(
                oldData.password
            );
            console.log(passwordValidator);

            if (
                !nameValidator.error &&
                !emailValidator.error &&
                !passwordValidator.error
            ) {
                const updateUser = new UserQueries().updateUser(
                    req.params.user_id,
                    oldData.username,
                    oldData.email,
                    oldData.first_name,
                    oldData.last_name,
                    oldData.password
                );
            } else {
                res.status(500).send("Dados incorretos");
            }
        }
    } else {
        res.status(500).send("Usuário não possui permissão");
    }
}
