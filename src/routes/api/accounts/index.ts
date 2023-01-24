
import { BASE_URL } from "../../../Model/public";
import axios from "axios";

//==================== login module ==========================//
export async function put(req, res){
    try {
        let body = req.body;
        console.log('body data here:',body, 'base url is', BASE_URL);
        try {
            const resd = await axios.put(BASE_URL + "/accounts/login", body);
            console.log(resd.data);
            req.session.token = resd.data.token;
            req.session.user = resd.data.respBody;
            res.json(resd.data);
          } catch (err) {
            if(err.status == 401) {
                console.log(err);
                res.json({status:'failed', msg: 'account is not active yet'});
            }
            else if(err.status == 400){
                res.status(401).json(err);
            }
            else{
                console.log(err.data);
                res.status(500).json(err);
            }
            
            
          }
      
    } catch (error) {

        console.log(error);
        res.status(503).json(error);
    }
}
//==================== registration module ======================//
export async function post(req, res){
    try {
        let body = req.body;
        delete(body.full_name);
        console.log('body data here:',body, 'base url is', BASE_URL);
        try {
            const resd = await axios.post(BASE_URL + "/accounts/client_register", body);
            console.log(resd.data);
            res.json(resd.data);
          } catch (err) {
            console.log(err);
            if(err.status == 402) {
                res.status(401).json(err);
            }
            else if(err.status == 400){
                res.status(401).json(err);
            }
            else{
                res.status(500).json(err);
            }
            
            
          }
      
    } catch (error) {

        console.log(error);
        res.status(503).json(error);
    }
}
//==================== confirm email =========================//
export async function patch(req, res){
    try {
       const resp = await axios.put(`${BASE_URL}/accounts/confirm_email`, req.body);
       if(resp.data.status == 'success'){
        res.json(resp.data)
       }
       else{
        res.json(resp.data);
       }
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}
//==================== retrieve user session details ========================//
export async function get(req, res){
    if(req.session.user){
        res.json({status: 'success', user: req.session.user, token: req.session.token});
    }
    else{

        res.json({status: 'failed'});
    }
}

