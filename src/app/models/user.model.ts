

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    mobile: string;
    deleted: boolean;
    lastModifiedDate: Date;
    createdDate: Date;
}

export class Role {
    id: string;
    name: string;
}


