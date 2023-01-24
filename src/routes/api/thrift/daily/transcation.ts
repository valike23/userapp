import axios from "axios";
import { BASE_URL } from "../../../../Model/public";


export async function post (req, res){
    try {
        const body = {
            thrift: req.body.trnasList,
            gateway: req.body.trans
        }
        console.log(JSON.stringify(body));
        res.json(body);
        const app = await  axios.post(BASE_URL + "/client/thrift/create", req.body,{
             headers: { "Authorization": `Bearer ${req.session.token}` }
         });
    } catch (error) {
        
    }
}