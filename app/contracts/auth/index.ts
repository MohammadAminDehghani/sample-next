

export interface LoginFormValuesInterface {
    email: string;
    password: string,
}

export interface RegisterFormValuesInterface {
    name: string;
    email: string;
    password: string,
}

export interface LoginFormValuesInterfacePhone {
    phone: string;
    password: string,
}

export interface RegisterFormValuesInterfacePhone {
    name: string;
    phone: string;
    password: string,
}

export interface LoginFormValuesInterfaceVerifyPhone {
    phone: string;
    token: string;
    code: string,
}