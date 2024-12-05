import { Link } from "react-router-dom";


export default function LeftBar() {
    return <div className={"left-bar"}>
        <ul>
            <li><Link to={"/"}> All Products</Link></li>
            <li><Link to={"/orders"}>Orders</Link></li>
        </ul>
    </div>
}