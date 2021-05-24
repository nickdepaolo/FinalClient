
export default interface IUser {
    sessionToken: string | null;
    updateLogout: string | null;
    id: number;
    maker: boolean,
    truth: boolean
}