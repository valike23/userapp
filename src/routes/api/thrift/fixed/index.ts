import axios from "axios";
import { BASE_URL } from "../../../../Model/public";

export async function get(req, res){
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
      const app = await  axios.get(BASE_URL + "/client/thrift/all?type=fixed", {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
       // console.log(app);
        let resp = app.data;
        console.log(resp);
        if(resp.status == 200) return res.json(resp.body);
        res.json([]);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}

export async function post(req, res){
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
        let {thrift, thrift_tran, trans} = req.body;
        thrift.type= 'fixed';
        console.log('some thrift text:',thrift);
      const app = await  axios.post(BASE_URL + "/client/thrift/create", thrift,{
            headers: { "Authorization": `Bearer ${req.session.token}` }
        });
        const id= app.data.body;
        console.log(id);
       // return res.json(id);
        thrift_tran.thriftId = id;
        const app2 = await  axios.post(BASE_URL + "/client/thrift/add_thrift_transcation", {gateway:trans, thrift: thrift_tran},{
            headers: { "Authorization": `Bearer ${req.session.token}` }
        });
       
        let resp = app2.data;
        if(resp.status == 200) return res.json(resp.body);
        res.json([]);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}

export async function put(req, res){
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
      const app = await  axios.get(BASE_URL + "/client/thrift/single?id=" + req.query.id, {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
       // console.log(app);
        let resp = app.data;
        console.log(resp);
        if(resp.status == 200) return res.json(resp.body);
        res.json([]);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}
//get the fixed  percentage details
export async function patch(req, res){
    try {
      
        
     const resp =  process.env.SAFESAVE_PERCENTAGE || 15;
     res.json({percentage: resp});
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}