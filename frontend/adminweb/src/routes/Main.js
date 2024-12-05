import { Link } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { NavBar } from "../components/NavBar";
import ProductItem from "../components/ProductItem";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Overlay from "../components/Overlay";
import { notifyBarContext } from "../App";
import AlertBar from "../components/AlertBar";


export default function MainPage() {
    const [products, setProducts] = useState([])
    const [showOverlay, setShowOverlay] = useState(-1)
    const [showBar, showBarFunc] = useContext(notifyBarContext)
    const navigate = useNavigate()

    const loadData = useCallback(
        async () => {
            try {
                console.log("fetching");
                let res = await fetch('http://localhost:1880/products/all', {
                    method: 'GET', headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                })
                let data = await res.json();
                if (data.redirect === true) {
                    console.log("REDIRECTING")
                    navigate('/login', { replace: true })
                    return
                }
                console.log(data);
                setProducts(data.products);
            } catch {
                setProducts([]);
                console.log("error");
            }
        }, [navigate]
    )

    useEffect(() => {
        loadData();
        async function verifyToken() {
            const res = await fetch('http://localhost:1880/verifyTokenValidity', { method: 'GET', credentials: 'include' })
            const token = await res.json()
            if (token.redirect === true) {
                navigate('/login', { replace: true })
            }
        }
        verifyToken()
    }, [loadData]);

    function toggleOverlay(val) {
        async function sendData() {
            try {
                const response = await fetch(`http://localhost:1880/delete/${showOverlay}`,
                    { method: 'DELETE', });

                if (!response.ok) {
                    throw new Error("error");
                }Z
                showBarFunc('Product was deleted.')
                await loadData()
                setShowOverlay(-1);
            } catch {
                console.log("error");
                setShowOverlay(-1);
            }
        }

        console.log(val);
        if (val !== -1 && showOverlay === -1) {
            setShowOverlay(val);
        } else if (val === -1) {
            setShowOverlay(-1);
        } else if (val === 1 && showOverlay !== -1) {
            sendData();
        }
    }

    return <>
        <section className={"main-section"}>
            <LeftBar />
            <div className={"right-content"}>
                {showOverlay !== -1 && <Overlay toggleOverlay={toggleOverlay} />}

                <NavBar />
                <div className={"main-content"} style={{ paddingTop: "50px" }}>
                    {showBar && <AlertBar text={showBar} />}
                    <div className={"row"} style={{ justifyContent: "space-between", alignItems: "end", width: "100%", marginBottom: "50px" }} >
                        <h2 onClick={() => { showBarFunc() }}>All products</h2>
                        <Link to={"/create-product"}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                                <p>Create a new product</p>
                                <p style={{ fontSize: "30px" }}><span>+</span></p>
                            </div>
                        </Link>
                    </div>
                    <div className={"products-grid"}>
                        {products.map((product) => {
                            return <ProductItem key={product.id} product={product} toggleOverlay={toggleOverlay}></ProductItem>
                        })}
                    </div>
                </div>
            </div>
        </section >
    </>
}