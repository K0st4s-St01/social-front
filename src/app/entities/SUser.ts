export default interface SUser{
    username:string,
    password:string,
    email:string,
    profileImage:string,
    posts: number[],
    friends: string[],
}