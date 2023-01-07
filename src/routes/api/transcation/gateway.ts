
import superagent from "superagent";
import { BASE_URL } from "../../../Model/public";



export enum Egateway {
    PAYSTACK = 'paystack',
    FLUTTERWAY = 'flutterway'
}
export enum EtranscationStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    SUCCESS = 'success',
    DECLINED = 'declined'
}
export enum EgatewayType {
    ADD_CARD = 'add card'
}
export interface IgatewayTranscation {
    _id?: any;
    user_id?: number;
    message?: string;
    reference?: string;
    gateway?: Egateway;
    status?: string;
    confirm_status?: EtranscationStatus;
    amount?: number;
    email?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    type?: EgatewayType
}


export async function post (req, res){
    try {
        let body = req.body;
        console.log('body data here:',body);
        const resd = await superagent.put(BASE_URL + "/transcation/login").send(body);
    } catch (error) {
        
    }
}