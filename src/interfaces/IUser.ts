export interface IUser {
    lastname: string | null;
    firstname: string | null;
    publicname: string | null;
    role: string | null;
    username: string | null;
    password: string | null;
    contact: {
        email: string | null;
        country: string | null;
    };
}