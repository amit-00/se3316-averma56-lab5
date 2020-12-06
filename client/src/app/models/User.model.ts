export interface User {
    _id:string;
    name:string;
    email:string;
    date: Date;
    isAdmin:boolean;
    deactivated:boolean;
}