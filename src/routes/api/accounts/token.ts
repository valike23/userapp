

import axios from "axios";
import { BASE_URL } from "../../../Model/public";




//==================== submit push token ======================//

export async function post(req, res){
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
     console.log('token', req.token);  
      const app = await  axios.post(BASE_URL + "/client/set-token", req.body,{
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
        console.log(app);
        let resp = app.data;
       res.json(app.data);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}