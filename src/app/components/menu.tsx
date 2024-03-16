import Link from "next/link";

const Menu = (props:{username:string}) => {
    return(<div className="menu">
        <div>
            <Link href={"/home/"+props.username}>Home</Link>
        </div>
        <div>
            <Link href={"/friends/"+props.username}>Friends</Link>
        </div>
        <div>
            <Link href={"/posts/"+props.username}>Posts</Link>
        </div>
        <div>
            <Link href={"/post/"+props.username}>New Post</Link>
        </div>
    </div>);
}
export default Menu;