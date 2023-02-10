
import axios from  'axios';
import { BASE_URL } from "../../../../Model/public";
export async function post (req, res){
    try {
        const body = {
            con: req.body.con,
            gateway: req.body.trans
        }
        console.log(JSON.stringify(body));
        //check
        const app = await  axios.post(BASE_URL + "/client/contribution/pay",body,{
             headers: { "Authorization": `Bearer ${req.session.token}` }
         });
         console.log('responsed!',app.data);
         res.json(app.data);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}