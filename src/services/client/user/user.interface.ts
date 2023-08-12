export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    password: string;
    createdDate?: Date;
    verified?: boolean;
}

