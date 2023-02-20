import axios from "axios";
import { BASE_URL } from "../../../Model/public";

export enum EpaymentType {
    CARD = 'card',
    TRANSFER = 'transfer',
    AGENT = 'agent'
}

export interface IcontributionTranscation{
    agentId?: number;
    clientId?: number;
    amountPaid?: number;
    contributionId?: number;
    createdAt?:Date,
    updateAt?: Date,
    resolved?: number;
    paymentRef?: string;
    type?: EpaymentType
}

export async function get (req, res){
    try {
        const app = await  axios.get(BASE_URL + "/client/contribution/single-transcations?id="+ req.query.id, {
            headers: { "Authorization": `Bearer ${req.session.token}` }
        });
         // console.log(app);
         let resp = app.data;
         console.log('second degree murder',resp);
          return res.json(resp);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}