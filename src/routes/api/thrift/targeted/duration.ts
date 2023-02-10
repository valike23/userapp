import axios from "axios";
import { BASE_URL } from "../../../../Model/public";


export async function get(req, res){
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
      const app = await  axios.get(BASE_URL + "/client/thrift/single_duration?id="+ req.query.id, {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
       // console.log(app);
        let resp = app.data;
        console.log('second degree murder',resp);
         return res.json(resp);
        
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}