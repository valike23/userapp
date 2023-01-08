
import { BASE_URL } from "../../../Model/public";
import superagent from "superagent";

export async function put(req, res){
    try {
        let body = req.body;
        console.log('body data here:',body, 'base url is', BASE_URL);
        try {
            const resd = await superagent.put(BASE_URL + "/accounts/login").send(body) as unknown as any;
            console.log(resd._body);
            req.session.token = resd._body.token;
            req.session.user = resd._body.respBody;
            res.json(resd._body);
          } catch (err) {
            if(err.status == 401) {
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