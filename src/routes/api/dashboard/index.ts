
import { BASE_URL } from "../../../Model/public";
import type { Response } from "express";
import axios from "axios";
//--------------------get client wallet details -------------------//
export async function get(req: any, res: Response) {
    try {
        if (!req.session.token) {
            res.status(401).json({ msg: 'no user session' });
            return;
        }
      const app = await  axios.get(BASE_URL + "/client/dashboard", {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        })
        console.log(app);
        res.json(app.data);

    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }

}