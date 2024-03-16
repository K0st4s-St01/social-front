"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PostService from "../services/PostService"
import { createRoot } from "react-dom/client";
import Post from "../entities/Post";

const PostForm= (props:{user:string}) => {
    const service = PostService.getInstance();
    const [file,setFile] = useState<File>();
    const [post,setPost] = useState<Post>({
        id: null,
        image: "",
        text: "",
        date: new Date(),
        user: props.user,
    })
    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
                setPost(prev =>({
                    ...prev,
                    text:e.target.value
            }));
    }
    const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
        const new_file = event.target.files?.[0];
                setFile(new_file);
                if (new_file) {
                setPost(prev =>({
                    ...prev,
                    image:URL.createObjectURL(new_file)
            }));
        }
    }
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(file){
            file.arrayBuffer().then(data => {
                post.image=Buffer.from(data).toString("base64");
                if(!window){
                    return
                }
                const token=localStorage.getItem("token")
                if(!token){
                    return;
                }
                service.create(post,token);
            });
        }
    }
   return(
   <div id="postformcontent">

        <form onSubmit={handleSubmit}>
            <p id="log"></p>
            <h3>Register here</h3>
            <textarea name="text" value={post.text} onChange={handleChange} placeholder="post text" required/>
            <input name="image" accept="image/*" type="file" onChange={handleImageChange}/>
            {post.image && <img src={post.image} alt="Selected" width={100} height={100} />}

            <button type="submit">Post</button>
        </form>
   </div>) 
}
export default PostForm;