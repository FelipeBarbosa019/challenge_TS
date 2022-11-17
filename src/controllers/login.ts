import UserQueries from "../repository/queries/users/queries";
import { QueryResponse } from '../interfaces/interface';

export async function login(req: any, res: any) {
    if(req.cookies) {
        const email = req.cookies.token.email;
        const password = req.cookies.token.password;

        // console.log('cookies: ',req.cookies)
        console.log('email: ',email)
        console.log('pw: ',password)

        const loginQuery : QueryResponse = await new UserQueries().login(email, password);
        console.log('DATA: ',loginQuery.data)
        res.status(200).cookie("token", loginQuery.data, {expire:(Date.now()+3600000)});
        
    } else {
        //hello super mario world
    }
    
}