export enum Role {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}
export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: Role = Role.NORMAL
    ) { }
    public getId = () => {
        return this.id
    }
    public getName = () => {
        return this.name
    }
    public getEmail = () => {
        return this.email
    }
    public getPassword = () => {
        return this.password
    }
    public getRole = () => {
        return this.role
    }
}