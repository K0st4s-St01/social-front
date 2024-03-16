import SUser from "../entities/SUser";
import { endpoint } from "./Endpoint";

export default class UserService{
    private static instance:UserService;


    public static getInstance():UserService{
        if(this.instance == undefined){
            this.instance = new UserService()
            return this.instance;
        }else{
            return this.instance;
        }
    }
    public async register(user:SUser){
        const resp = await fetch(endpoint+"/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        })
        console.log(resp)
        return await resp.json();
    }

    public async login(user:SUser){
        const resp = await fetch(endpoint+"/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        return await resp.json();
    }

    public async update(user:SUser,token:string){
        const resp = await fetch(endpoint+"/user",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
            body:JSON.stringify(user)
        })
        return await resp.json();
    }
    
    public async delete(username:string,token:string){
        const resp = await fetch(endpoint+"/user/"+username,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
        })
        return await resp.json();
    }

    public async readAll(page:number,size:number,token:string){
        const resp = await fetch(endpoint+"/user/"+page+"/"+size,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
        })
        return await resp.json();
    }

    public async readOne(username:string,token:string){
        const resp = await fetch(endpoint+"/user/"+username,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
        })
        return await resp.json();
    }

    public async readNotFriends(username:string,page:number,size:number,token:string){
        const resp = await fetch(endpoint+"/user/not-friends/"+username+"/"+page+"/"+size,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
        })
        return await resp.json();
    }

    public async paginationInfo(size:number,token:string){
        const resp = await fetch(endpoint+"/user/pages/"+size,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
        })
        return await resp.json();
    }
}