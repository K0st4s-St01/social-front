import FriendsTable from "@/app/components/FriendsTable";
import UserProfile from "@/app/components/UserProfile";
import Menu from "@/app/components/menu";
import Image from "next/image";

export default function Home(params:{params: {username :string}}) {
  return (
  <div>
    <Menu username={params.params.username}/>
    <div className="content">
        <FriendsTable username={params.params.username}/>
      </div>
  </div>
  );
}
