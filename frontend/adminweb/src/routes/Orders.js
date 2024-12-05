import { useEffect, useState } from "react";
import LeftBar from "../components/LeftBar";
import { NavBar } from "../components/NavBar";
import OrderTile from "../components/OrderTile";
import { useNavigate } from "react-router-dom";


export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            const res = await fetch("http://localhost:1880/orders", {
                method: "GET", credentials: 'include', headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (data.redirect === true) {
                console.log("REDIRECTING")
                navigate('/login', { replace: true })
                return
            }
            setOrders(data.orders);
        }
        loadData();


    }, [navigate]);

    return <>
        <section className={"main-section"}>
            <LeftBar />
            <div className={"right-content"}>
                <NavBar />
                <div className={"main-content"} style={{ paddingTop: "50px" }}>
                    <h2>Orders</h2>
                    <ul className={"orders-list"}>
                        <li className={"order-tile-layout"} style={{ marginBottom: "10px" }}>
                            <p>ID</p>
                            <div className={"info"}>
                                <div>
                                    <p>Date</p>
                                </div>
                                <div>
                                    <p>Price</p>
                                </div>
                                <div>
                                    <p style={{ padding: "0 10px" }}>Status</p>
                                </div>
                            </div>
                        </li>
                        {orders.map((order) => {
                            return <OrderTile key={order.id} order={order} />
                        })}
                    </ul>
                </div>
            </div>
        </section >
    </>
}