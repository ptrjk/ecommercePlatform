import { Link } from 'react-router-dom';
import headerImg from '../assets/header.jpg';

export function Header() {
    return <div style={{ backgroundColor: '#ecebd9', width: '100vw', minWidth: "450px" }}>
        <div className='header-content'>
            <div className='header-row'>
                <div className='col' style={{ flex: "1", marginTop: "70px", alignItems: "center" }}>
                    <h1>Transform Your Space with Timeless Style</h1>
                    <h2>Explore Our Exclusive Collection of Luxury Furniture, Where Quality Meets Sophistication to Elevate Every Room in Your Home</h2>
                    <Link to={"products/all"} className='header-button link'>
                        Shop Now
                    </Link>
                </div>
                <div style={{ height: "600px", flex: "1", display: "flex" }} className='header-img-div'>
                    <img src={headerImg} alt='headerImage' className='header-img'></img>
                </div>
            </div>
        </div>
    </div>

}