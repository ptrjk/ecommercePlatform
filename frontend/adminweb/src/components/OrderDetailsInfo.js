import { transformStatus } from "../helpFunctions";
import logo from "../assets/Untitled.png";
import OrderDetailsProduct from "./OrderDetailsProduct";


export default function OrderDetailsInfo({ dataOrder }) {
    const order = dataOrder.order;
    if (!order) return <p>error</p>
    const formatedDate = new Date(order.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        hourCycle: 'h24',
        minute: 'numeric',
        second: '2-digit'
    })

    async function updateQuantity() {
        const res = await fetch(`http://localhost:1880/order/${order.id}/updatestatus`, { method: "POST", credentials: "include" })
        const data = await res.json()
        //reloadF()
    }


    return <div style={{ width: "100%" }}>
        <button onClick={updateQuantity}>Update Order Status</button>
        <div className="row" style={{
            width: "100%", gap: "20px", marginTop: "20px"
        }}>
            <div className="order-details-info">
                <h6>Order Details</h6>
                <div>
                    <h3>Status</h3>
                    <p className={"statusYellow"}>{transformStatus(order.orderStatus)}</p>
                </div>
                <div>
                    <h3>Name</h3>
                    <p>{order.userName}</p>
                </div>
                <div>
                    <h3>Address</h3>
                    <p>{order.address}</p>
                </div>
                <div>
                    <h3>Price</h3>
                    <p>{order.price} $</p>
                </div>
                <div>
                    <h3>Phone Number</h3>
                    <p>{order.number}</p>
                </div>
                <div>
                    <h3>Email</h3>
                    <p>{order.email}</p>
                </div>
                <div>
                    <h3>Created at</h3>
                    <p>{formatedDate}</p>
                </div>
            </div >
            <div className="order-details-product-list">
                <h6 style={{ marginBottom: "10px" }}>Ordered Products</h6>
                {dataOrder.products.length === 0 ? <p>No products</p> : dataOrder.products.map((product, index) => <OrderDetailsProduct product={product} key={index} />)}

            </div>
        </div >
    </div>
}