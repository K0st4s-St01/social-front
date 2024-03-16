import Post from "../entities/Post";
import { endpoint } from "./Endpoint";

export default class PostService{
    private static instance:PostService;

    public static getInstance():PostService{
        if(this.instance == undefined){
            this.instance = new PostService()
            return this.instance;
        }else{
            return this.instance;
        }
    }
    public async create(post:Post , token:string){
        const resp = await fetch(endpoint+"/post",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
        },
        body: JSON.stringify(post)
        })
        return await resp.json()
    }
    public async update(post:Post , token:string){
        const resp = await fetch(endpoint+"/post",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
        },
        body: JSON.stringify(post)
        })
        return await resp.json()
    }
    public async delete(post_id:number , token:string){
        const resp = await fetch(endpoint+"/post/"+post_id,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
        },
        })
        return await resp.json()
    }

    public async readOne(post_id:number , token:string){
        const resp = await fetch(endpoint+"/post/"+post_id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
        },
        })
        return await resp.json()
    }

    public async readAll(user:string,page:number,size:number , token:string){
        const resp = await fetch(endpoint+"/post/"+user+"/"+page+"/"+size,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
        },
        })
        return await resp.json()
    }

    public async paginationInfo(size:number , token:string){
        const resp = await fetch(endpoint+"/post/pages/"+size,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
        },
        })
        return await resp.json()
    }
    
}