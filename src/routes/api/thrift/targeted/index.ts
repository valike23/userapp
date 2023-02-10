import axios from "axios";
import { BASE_URL } from "../../../../Model/public";

export async function get(req, res){
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
      const app = await  axios.get(BASE_URL + "/client/thrift/all?type=targetted", {
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
        console.log('get targetted', req.body);
        req.body.type = 'targetted';
      const app = await  axios.post(BASE_URL + "/client/thrift/create", req.body,{
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
      
        let resp = app.data;
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
//get the targetted duration details
export async function patch(req, res){
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
        const app = await  axios.get(BASE_URL + "/client/thrift/targetted_duration", {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
       // console.log(app);
        let resp = app.data;
        console.log(resp);
        res.json(resp);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}