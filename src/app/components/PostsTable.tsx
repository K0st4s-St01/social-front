"use client";
import { useEffect, useState } from "react";
import PostService from "../services/PostService"
import Post from "../entities/Post";
import { createRoot } from "react-dom/client";

const PostsTable = (props:{user:string}) => {
    const [page,setPage] = useState<number>(0)
    const service = PostService.getInstance();
    useEffect(()=>{
        if(window == undefined){
            return
        }
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }
        service.readAll(props.user,page,10,token).then(
            data => {
            const tsx=<>{data.map((item:Post) => (
                    <div>
                        <div>
                            <pre>{item.text}</pre>
                        </div>
                        <div>
                            <img src={"data:image/jpeg;base64,"+item.image} alt="image" />
                        </div>
                        
                        </div>                    
                
                ))}</>
            const table=document.getElementById("postTable");
            if(!table){
                return;
            }
            const root=createRoot(table);
            root.render(tsx);
            }
        );
    })
    return(
        <div id="postTable"></div>
    )
}
export default PostsTable;