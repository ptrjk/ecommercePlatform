import { Link } from "react-router-dom";
import logo from "../assets/dropdown.svg";
import { useContext } from "react";
import { CartContext } from "../App";

export function NavBar() {
    const [cart, setCart] = useContext(CartContext);

    const getCartCount = () => {
        let total = 0;
        cart.forEach(element => {
            total += element.quantity;
        });


        return total > 0 && "- ( " + total + " )";
    }
    return (
        <nav className="nav">
            <div className="nav-content">
                <div className='dropdown'>
                    <div style={{ display: "flex", gap: "7px" }}>
                        <h4>Rooms</h4>
                        <img src={logo} alt="Logo" />
                    </div>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">
                            <Link to="/products/living-room">Living Room</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/products/bedroom">Bedroom</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/products/kitchen">Kitchen</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/products/bathroom">Bathroom</Link>
                        </li>
                    </ul>
                </div>
                <div className="logo">
                    <Link to={"/"} className="link">
                        <h3 style={{ textTransform: "uppercase", letterSpacing: "5px" }}><span>A</span>FurnitÜre</h3>
                    </Link>

                </div>
                <div>
                    <Link className="link" to={"/cart"}><h4>Cart {getCartCount()}</h4></Link>
                </div>
            </div>
        </ nav >
    );
}

