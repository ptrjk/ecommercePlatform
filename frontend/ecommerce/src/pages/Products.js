import { NavBar } from "../components/NavBar";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";


export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [addedToCart, setAddedToCart] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    let category = params.category
    let categoryTitle = ''
    console.log(category)

    switch (category) {
        case 'all':
            categoryTitle = 'All'
            break;
        case 'kitchen':
            categoryTitle = 'Kitchen'
            break;
        case 'living-room':
            categoryTitle = 'Living Room'
            break;
        case 'bedroom':
            categoryTitle = 'Bedroom'
            break;
        case 'bathroom':
            categoryTitle = 'Bathroom'
            break;
        default:
            navigate('/error', { replace: true })
    }

    useEffect(() => {
        console.log("fetching");
        fetch(`http://localhost:1880/products/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
            });
    }, [setProducts, category]);

    function notify() {
        if (addedToCart) return
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
        }, 3000);
    }


    return <>
        {/* <ScrollRestoration></ScrollRestoration> */}
        <NavBar/>
        <div className='main-content'>
            <p className={`${addedToCart && "addToCart"}`}>{addedToCart && "Added to cart"}</p>
            <section className="products-section">
                <h1>{categoryTitle}</h1>
                <h3>Our products</h3>
                <div className="grid-product">
                    {products.map((product) => {
                        return <ProductItem product={product} key={product.id} addToCartF={notify} />
                    })}
                </div>
            </section>
        </div >
    </>
}