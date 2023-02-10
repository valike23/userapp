import axios from "axios";
import { BASE_URL } from "../../../../Model/public";

export async function get(req, res) {
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
        console.log('the id', req.query.id);
       if(req.query.id){
        const app = await axios.get(BASE_URL + "/client/contribution/single?id=" + req.query.id, {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
        // console.log(app);
        let resp = app.data;
        console.log(resp);
        return res.json(resp);
       }
       else{
        const app = await axios.get(BASE_URL + "/client/contribution/all", {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
        // console.log(app);
        let resp = app.data;
        console.log(resp);
        return res.json(resp);
       }

    } catch (error) {
        
        res.status(503).json(error);
    }
}

export async function post(req, res) {
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
        const app = await axios.post(BASE_URL + "/client/contribution/join?id=" + req.query.id,{}, {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        });
        console.log(app.data);
        res.json(app.data);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}

export async function put(req, res) {
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
        const app = await axios.get(BASE_URL + "/client/thrift/single?id=" + req.query.id, {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
        // console.log(app);
        let resp = app.data;
        console.log(resp);
        if (resp.status == 200) return res.json(resp.body);
        res.json([]);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}
//get the fixed  percentage details
export async function patch(req, res) {
    try {
       
        console.log('white people and native americans');
        const app = await axios.get(BASE_URL + "/open/contributions")
        // console.log(app);
        let resp = app.data;
        console.log(resp);
        return res.json(resp);

    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}