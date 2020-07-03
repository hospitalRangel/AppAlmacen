export class Roles {
    analista?: boolean;
    admin?: boolean;
}

export class User {
    uid?: string;
    id?: string;
    email?: string;
    password?: string;
    rol?: Roles;
}