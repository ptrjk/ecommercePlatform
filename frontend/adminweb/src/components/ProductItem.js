import logo from "../assets/1.jpg";

export default function ProductItem({ product, toggleOverlay }) {
    return <div className={"product-item"}>
        <img src={`http://localhost:1880/images/${product.pictureUrl}` || logo} alt="img"></img>
        <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="row">
                <h2>{product.price} $</h2>
                <button onClick={() => toggleOverlay(product.id)}>Remove</button>
            </div>
        </div>
    </div >
}