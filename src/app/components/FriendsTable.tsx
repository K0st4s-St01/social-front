"use client";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import SUser from "../entities/SUser";
import { createRoot } from "react-dom/client";

const FriendsTable = (props:{username:string}) => {
    const service:UserService = UserService.getInstance();
    const [page,setPage] = useState<number>(0);
    if(window == undefined){return;}
    const token = localStorage.getItem("token")
    if(!token){return;}
    const addnewfriend = (friend:string) => {
        service.readOne(props.username,token).then(
            data => {
                const user:SUser=data;
                user.friends.push(friend);
                service.update(user,token).then(data=>{
                    console.log(data);
                })
            }
        )
    }
    useEffect(() => {
        service.paginationInfo(10,token).then(data=>
            {   
                const friends = document.getElementById("friends");
                const pagination = document.getElementById("pagination");
                if(!friends || !pagination){
                    return;
                }
                friends.innerHTML="";
                const root = createRoot(friends);
                const root2 = createRoot(pagination);
                service.readNotFriends(props.username,page,10,token).then(data => {
                    console.log(data)
                        const tsx = (<div>
                                {data.map((item:SUser) => (
                                    <div id={item.username}>
                                        <p>{item.username}</p>
                                        <img src={"data:image/jpeg;base64,"+item.profileImage} width={400} height={400} alt="" />
                                        <button id={"follow_"+item.username} onClick={()=>{addnewfriend(item.username);}}>follow</button>
                                    </div>
                                ))}
                            </div>)
                        root.render(tsx);
                });
                var pagination_tsx; 
                var pages_array:number[] = []
                //pagination
                    for(let i=0;i<=data.result;i++){
                        pages_array.push(i+1);
                    }
                    pagination_tsx = (<div className="flex">
                        {pages_array.map((item:number)=>(<button onClick={()=>{setPage(item-1);}} >{item}</button>))}
                    </div>)
                    root2.render(pagination_tsx);
                        
                
                //pagination
            }
        )
    })
    return(
        <div>
            <div id="pagination">

            </div>
            <div id="friends">

            </div>
        </div>
    )

}
export default FriendsTable;