"use client";

import { ReactElement, useEffect } from "react";
import UserService from "../services/UserService";
import SUser from "../entities/SUser";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";

const UserProfile = (props:{username:string}) => {
    const service:UserService = UserService.getInstance();
    useEffect(() => {
        if(window!= undefined){
            const token:string|null =localStorage.getItem("token");
            if(!token){
                return;
            }
            service.readOne(props.username,token).then(data => {
                    const userdata:SUser = data;
                const profile_tsx = (
                    <div>
                       <div><h3>{userdata.username}</h3></div>
                        <div><p>{userdata.email}</p></div>
                        <div><img src={"data:image/jpeg;base64,"+userdata.profileImage} /></div>
                        <div>{userdata.friends.map((item,index) => (
                            <div>{item}</div>
                        ))}</div>
                    </div>
                );
                const profile = document.getElementById("profile");
                if(!profile){return}
                const root = createRoot(profile);
                root.render(profile_tsx);
            });
        }
    })
    return(
        <div id="profile">

        </div>
    )
}
export default UserProfile;