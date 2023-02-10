import axios from "axios";
import { BASE_URL } from "../../../../Model/public";


export async function post (req, res){
    try {
        const body = {
            thrift: req.body.thrift_tran,
            gateway: req.body.trans
        }
        console.log(JSON.stringify(body));
        //check
        const app = await  axios.post(BASE_URL + "/client/thrift/add_thrift_transcation",body,{
             headers: { "Authorization": `Bearer ${req.session.token}` }
         });
         console.log('responsed!',app.data);
         res.json(app.data);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}
//ending the thrift here

export async function put(req, res){
try {
    console.log(req.body);
    const app = await  axios.post(BASE_URL + "/client/thrift/withdrawal_thrift",req.body,{
        headers: { "Authorization": `Bearer ${req.session.token}` }
    });
    console.log('responsed!',app.data);
    res.json(app.data);
} catch (error) {
    console.log(error);
    res.status(503).json(error);
}
}