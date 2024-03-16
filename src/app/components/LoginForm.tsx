"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import SUser from "../entities/SUser";
import UserService from "../services/UserService";
import { createHash } from "crypto";
import Link from "next/link";

const LoginForm = () => {
    const [user,setUser] = useState<SUser>({
        username : "",
        password : "",
        profileImage: "",
        email: "",
        friends: [],
        posts: []
    });
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setUser(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    const service:UserService = UserService.getInstance();
    
    const handleSubmit = (event:FormEvent) => {
        const pass = user.password;
        user.password = createHash("sha512").update(user.password).digest("hex");
        event.preventDefault();
        service.login(user).then(data => {
            console.log(data)
            localStorage.setItem("token",data.token);
            const log = document.getElementById("log");
            if(!log){
                return;
            }
            log.innerHTML = data.result;
            if(data.result=="ok"){
                window.location.href="/home/"+user.username;
            }

        })
        user.password = pass;
    }
    return(
        <form method="POST" onSubmit={handleSubmit} className="translate">
            <h3>Login here</h3>
            <p id="log"></p>
            <input name="username" value={user.username} onChange={handleChange} type="text" placeholder="username"/>
            <input name="password" value={user.password} onChange={handleChange} type="password" placeholder="password"/>
            <button type="submit">Log in</button>
            <Link href={"/register"} >register</Link>
        </form>
    )
}
export default LoginForm;