"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexValidator = void 0;
class RegexValidator {
    // username(check: any) {
    //     ///\d\S\w/gim
    //     const regex = new RegExp(/^[A-Za-z0-9_]{7,29}$/gim);
    //     // RegExp(/^[\d\S\w]{5,20}+$/gi);
    //     // RegExp(/^[A-Za-z0-9_]{7,29}$/gim);
    //     if (!regex.test(check)) {
    //         return {
    //             message:
    //                 "Username incorreto, deve conter apenas alfabetos, números ou sublinhados com comprimento de 8-30 caracteres.",
    //         };
    //     }
    //     return { message: "Username validado com sucesso" };
    // }
    name(check) {
        const regex = new RegExp(/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim);
        if (!regex.test(check)) {
            return { message: "Nome incorreto" };
        }
        return { message: "Nome validado com sucesso" };
    }
    email(check) {
        const regex = new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
        if (!regex.test(check)) {
            return { message: "E-mail incorreto" };
        }
        return { message: "E-mail validado com sucesso" };
    }
    pass(check) {
        // const regex = new RegExp(/^\w{4,}$/gim);
        const regex = new RegExp(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\/\*\-\+\.\)\(\&\%\$\#\@\!]).{6,32})$/gim);
        if (!regex.test(check)) {
            return {
                message: "Senha incorreta, deve conter no mínimo com 4 caracteres alfanuméricos",
            };
        }
        return { message: "Senha validada com sucesso" };
    }
}
exports.RegexValidator = RegexValidator;
