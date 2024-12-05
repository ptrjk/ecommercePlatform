import { useNavigate, useParams } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { NavBar } from "../components/NavBar";
import '../OrderStyle.css';
import OrderDetailsInfo from "../components/OrderDetailsInfo";
import { useEffect, useState } from "react";
import backIcon from '../assets/back.svg';


export default function OrderDetailPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        async function loadData() {
            console.log(orderId)
            if (!orderId) return
            const res = await fetch(`http://localhost:1880/order/${orderId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await res.json();
            setOrder(data);
            console.log(data);
        }

        loadData();

    }, [orderId]);
    if (!order)
        return <p>Loading...</p>

    return <>
        <section className={"main-section"}>
            <LeftBar />
            <div className={"right-content"}>
                <NavBar />
                <div className={"main-content"} style={{ paddingTop: "20px" }}>
                    <div className={"col"} style={{ justifyContent: "space-between", alignItems: "start", width: "100%", marginBottom: "50px" }} >
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }} onClick={() => navigate(-1)}>
                            <img src={backIcon} alt="back icon" style={{ width: "20px" }} />
                            <p>Back</p>
                        </div>
                        <h2>Order {""}</h2>
                    </div>
                    <OrderDetailsInfo dataOrder={order} />
                </div>
            </div>
        </section >
    </>;
}