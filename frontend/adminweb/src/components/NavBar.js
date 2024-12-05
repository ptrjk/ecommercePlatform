import '../NavBar.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

export function NavBar() {
    const location = useLocation()
    const [loggedIn, setLoggedIn] = useState(false)
    function logout() {
        setLoggedIn(false)
        Cookies.remove('token')
    }

    useEffect(() => {
        if (location.pathname === '/login')
            setLoggedIn(false)
        else
            setLoggedIn(true)
    }, [])

    return (
        <nav className="nav">
            <div className="nav-content">
                <Link to='/'>
                    <div className='col' style={{ alignItems: "center" }}>
                        <h3 style={{ textTransform: "uppercase", letterSpacing: "5px" }}>FurnitÜre</h3>
                        <h5>admin web</h5>
                    </div>
                </Link>
                <div>
                    <Link to='/login' onClick={logout}>
                        <p style={{ fontWeight: 400 }}>{loggedIn ? 'Log out' : 'Log In'}</p>
                    </Link>
                </div>
            </div>
        </ nav >
    );
}

