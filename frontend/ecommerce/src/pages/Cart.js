import { NavBar } from "../components/NavBar";
import '../Cart.css';
import CartItem from "../components/CartItem";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import PopUpDialog from "../components/Dialog";


export default function CartPage() {
    const [cart, setCart] = useContext(CartContext);
    const [products, setProducts] = useState([])
    const [showDialog, setShowDialog] = useState(-1);

    const FindProductById = (id) => {
        let product = null;
        products.forEach(element => {
            if (element.id === id)
                product = element;
        });
        return product;
    }

    const updateQuantity = (id, add) => {
        let cartIndex = -1;
        cart.forEach((item, index) => {
            if (item.id === id && cartIndex === -1) cartIndex = index;
        })
        if (cartIndex === -1) return;

        setCart((prevCart) => {
            let newCart = [...prevCart];
            if (newCart[cartIndex].quantity <= 1 && add === false) {
                setShowDialog(cartIndex);
            }
            else if (newCart[cartIndex].quantity > 1 || (newCart[cartIndex].quantity >= 1 && add === true)) {
                newCart[cartIndex].quantity = add ? newCart[cartIndex].quantity + 1 : newCart[cartIndex].quantity - 1;
            }
            return newCart;
        })
    }

    const updateDialog = (value) => {
        if (showDialog === -1 || value === false || !value) {
            setShowDialog(-1);
            return;
        }

        setCart((prevCart) => {
            let newCart = prevCart.filter((item, index) => index !== showDialog);
            setShowDialog(-1);
            return newCart;
        });

    }

    function test(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data = {};
        for (const [keys, values] of formData.entries()) {
            data[keys] = values;
        }
        data['price'] = calculateTotal();
        data['cart'] = cart;

        fetch("http://localhost:1880/order", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const calculateTotal = () => {
        let total = 0;
        cart.forEach((cartItem) => {
            let product = FindProductById(cartItem.id);
            if (product !== null) {
                total += cartItem.quantity * product.price;
            }
        });
        return total;
    }

    useEffect(() => {
        async function loadData() {
            const res = await fetch('http://localhost:1880/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartitems: cart })
            })

            const data = await res.json()
            setProducts(data)
            console.log(data)
        }
        loadData()
    }, [])
    return <>
        <NavBar></NavBar>
        {showDialog !== -1 &&
            <PopUpDialog title={"Do you want to delete this product?"}
                desc={"Product will be permanently deleted from your cart."}
                func={updateDialog}
            />}
        <div className="main-content">
            <section className="cart-products">
                <h3>My Cart</h3>

                {cart.map((cartItem, index) => {
                    let product = FindProductById(cartItem.id);
                    if (product !== null) {
                        return <CartItem product={product} key={product.id} quantity={cartItem.quantity} updateQuantity={updateQuantity} />
                    }
                    return null;
                })}
                {cart.length === 0 && <p>Cart is empty..</p>}
                <h3 style={{ marginTop: "100px", marginBottom: "20px" }}>Total order price: {calculateTotal()}$</h3>
            </section>
            <div className="divider"></div>
            <section className="orderDetails-section">
                <h3>Order Details</h3>
                <form className="cart-form" onSubmit={test}>
                    <div>
                        <label id="name" htmlFor="name">Name</label>
                        <input name="name"></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email"></input>
                    </div>
                    <div>
                        <label id="phone" htmlFor="phone">Phone Number</label>
                        <input name="phone" type="number"></input>
                    </div>
                    <div>
                        <label id="address" htmlFor="address">Address</label>
                        <input name="address"></input>
                    </div>
                    <button className="form-submit" type="submit">Order</button>
                </form>
            </section>
        </div>
    </>
}