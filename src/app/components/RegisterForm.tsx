"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import SUser from "../entities/SUser";
import UserService from "../services/UserService";
import { createHash } from "crypto";
import Link from "next/link";
import path from "path";


const RegisterForm = () => {
   
    const [user,setUser] = useState<SUser>({
        username:"",
        password: "",
        email: "",
        posts: [],
        profileImage: "",
        friends: [],
    });
    const [file,setFile] = useState<File>();
    
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const new_file = event.target.files?.[0];
        setFile(new_file);
        if (new_file) {
          setUser(prev =>({
            ...prev,
            profileImage:URL.createObjectURL(new_file)
        }));
        }
      };
    
    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setUser(prev => (
            {
            ...prev,
            [name]:value,
        }
        ))
    }
    const service:UserService = UserService.getInstance();

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        if(file){
            file.arrayBuffer().then(data => {
                user.profileImage=Buffer.from(data).toString("base64");
                const hash = createHash("sha512");
                const pass = user.password;
                user.password = hash.update(user.password).digest("hex");
                service.register(user).then(data => {
                    const log = document.getElementById("log");
                    if(!log){
                        return;
                    }
                    log.innerHTML = data.result;
                }).catch(error => console.log(error));
                user.password = pass;
            })
        }
    }

    return(
        <form onSubmit={handleSubmit} className="translate">
            <p id="log"></p>
            <h3>Register here</h3>
            <input name="username" value={user.username} onChange={handleChange} type="text" placeholder="username" required/>
            <input name="password" value={user.password} onChange={handleChange} type="password" placeholder="password" required/>
            <input name="email" value={user.email} type="email" onChange={handleChange} placeholder="email" required/>
            <input name="image" accept="image/*" type="file" onChange={handleImageChange}/>
            {user.profileImage && <img src={user.profileImage} alt="Selected" width={100} height={100} />}

            <button type="submit">Sign up</button>
            <Link href={"/"} >Login</Link>
        </form>
    )
}
export default RegisterForm;