import UserQueries from "../repository/queries/users/queries";
import { RegexValidator } from "../validators/register";

export async function updateUser(req: any, res: any) {
    if (req.cookies.token.id == req.params.user_id) {
        const newData = req.cookies.token;

        if (req.body.email) {
            const uniqueEmailCheck = await new UserQueries().verify(
                req.body.email
            );

            if (!uniqueEmailCheck.error) {
                Object.keys(req.body).forEach((key) => {
                    newData[key] = req.body[key];
                });

                const nameValidator = new RegexValidator().name(
                    newData.first_name + newData.last_name
                );

                const emailValidator = new RegexValidator().email(
                    newData.email
                );

                const passwordValidator = new RegexValidator().pass(
                    newData.password
                );

                if (
                    !nameValidator.error &&
                    !emailValidator.error &&
                    !passwordValidator.error
                ) {
                    const updateUser = await new UserQueries().updateUser(
                        req.params.user_id,
                        newData.user_name,
                        newData.email,
                        newData.first_name,
                        newData.last_name,
                        newData.password
                    );
                    
                    if (!updateUser.error) {
                        res.cookie("token", newData, {
                            expire: Date.now() + 3600000,
                        });
                        res.status(200).send("Dados modificados com sucesso");
                    }
                } else {
                    res.status(400).send("Dados incorretos");
                }
            } else {
                res.status(400).send("Email já cadastrado");
            }
        } else {
            Object.keys(req.body).forEach((key) => {
                newData[key] = req.body[key];
            });

            const nameValidator = new RegexValidator().name(
                newData.first_name + newData.last_name
            );

            const emailValidator = new RegexValidator().email(newData.email);

            const passwordValidator = new RegexValidator().pass(
                newData.password
            );

            if (
                !nameValidator.error &&
                !emailValidator.error &&
                !passwordValidator.error
            ) {
                const updateUser = await new UserQueries().updateUser(
                    req.params.user_id,
                    newData.user_name,
                    newData.email,
                    newData.first_name,
                    newData.last_name,
                    newData.password
                );
                if (!updateUser.error) {
                    res.cookie("token", newData, {
                        expire: Date.now() + 3600000,
                    });
                    res.status(200).send("Dados modificados com sucesso");
                }
            } else {
                res.status(400).send("Dados incorretos");
            }
        }
    } else {
        res.status(403).send("Usuário não possui permissão");
    }
}
