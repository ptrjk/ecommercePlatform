
export default function CartItem({ product, quantity, updateQuantity }) {
    return <div className="cart-product">
        <img src={`http://localhost:1880/images/${product.pictureUrl}`} alt="test"></img>
        <div className="cart-info">
            <h1>{product.title}</h1>
            <div style={{ marginTop: "30px" }}>
                <div className="row" style={{ marginBottom: "10px" }}>
                    <p>Quantity</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="inputButton" onClick={() => updateQuantity(product.id, false)}>-</div>
                        <p style={{ margin: "0 10px" }}>{quantity}</p>
                        <div className="inputButton" onClick={() => updateQuantity(product.id, true)}>+</div>
                    </div>
                </div>
                <div className="row">
                    <p>Total Price</p>
                    <p><span>{product.price * quantity} $</span></p>
                </div>
            </div>
        </div>
    </div>
}