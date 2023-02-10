interface Iclient {
    clientId?: number;
    wallet?: number;
    thrift_balance?: number;
    investment_balance?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Iuser {
    full_name?: string;
    first_name?: string;
    is_active?: boolean;
    email_verified?: boolean;
    last_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    id?: number;
    client?: Iclient
}