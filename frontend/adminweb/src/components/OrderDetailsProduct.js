
import logo from "../assets/Untitled.png";

export default function OrderDetailsProduct({ product }) {
    console.log(product)
    return <div className="order-details-product">
        <img src={`http://localhost:1880/images/${product.pictureUrl}` || logo} alt="img"></img>
        <div className="order-details-product-info">
            <h2>{product.title}</h2>
            <div style={{ marginTop: "10px" }}>
                <p>Quantity: {product.quantity}x</p>
                <p>Price: {product.price} $</p>
            </div>
        </div>
    </div>
}