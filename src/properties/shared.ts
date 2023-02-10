export enum Epage {
    HOME = 'home',
    CONTRIBUTION = 'contribution',
    INVESTMENT = 'investment'
}
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
    ADD_CARD = 'add card',
    THRIFT_PAYMENT = 'thrift payment'
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

export enum Esvg {
    BANKER = 'svg/banker.svg',
    CARD = 'svg/cards.svg',
    CASH = 'svg/cash.svg'
}