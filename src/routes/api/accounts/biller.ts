import axios from "axios";
import type { Request, Response } from "express";
import { BASE_URL } from "../../../Model/public";

//----------------- get all biller record based on biller info --------------------//
export async function get(req: Request, res: any){
    try {
        const resd = await axios.get(BASE_URL + "/open/flutterwave/bills?code=" + req.query.code);
        console.log('resp', resd.data);
        res.json(resd.data);
    } catch (error) {
        console.log(error);
        res.json([]);
    }
}