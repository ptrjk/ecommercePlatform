import { useContext } from "react"
import { CartContext } from "../App"

export default function ProductItem({ product, addToCartF }) {
    const [cart, setCart] = useContext(CartContext);

    function isInCart(id) {
        let inCart = -1
        cart.forEach((item, index) => {
            if (item.id === id && inCart === -1)
                inCart = index;
        });
        return inCart;
    }

    const addToCart = (id) => {
        let index = isInCart(id);
        if (index === -1) {
            setCart((cart) => {
                return [...cart, { id: id, quantity: 1 }];
            });
        } else {
            setCart((cart) => {
                let newCart = [...cart];
                newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 }
                return newCart;
            });
        }
        addToCartF();
    }

    return <div className="product-item">
        <img src={`http://localhost:1880/images/${product.pictureUrl}`} alt="image"></img>
        <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="col">
                <h2>{product.price} $</h2>
                <button onClick={() => addToCart(product.id)}>Add To Cart</button>
            </div>
        </div>
    </div >
}