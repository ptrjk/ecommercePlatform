import { Link } from "react-router-dom";
import { transformStatus } from '../helpFunctions';

export default function OrderTile({ order }) {
    let orderDate = new Date(order.date);

    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric'
    });

    return <Link to={`/orders/${order.id}`}>
        <li className={"order-tile-layout order-tile"}>
            <div className="title">
                <p>{order.id}</p>
            </div>
            <div className={"info"}>
                <div className="date">
                    <p >{formattedDate}</p>
                </div>
                <div className="price">
                    <p>{order.price}</p>
                </div>
                <div className="status">
                    <p className={"statusYellow"}>{transformStatus(order.orderStatus)}</p>
                </div>

            </div>
        </li >
    </Link>
}