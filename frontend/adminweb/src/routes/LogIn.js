import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function submitData(event) {
        setIsLoading(true)
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            username: formData.get("name"),
            password: formData.get("password")
        }

        try {
            const response = await fetch("http://localhost:1880/login", {
                method: "POST", body: JSON.stringify(data), credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const tokenData = await response.json()
            console.log(tokenData)
            if (tokenData.message === "ok") {
                setIsLoading(false)
                navigate('/', { replace: true });
            } else {
                setIsLoading(false)
            }
        } catch (e) {
            console.log(e)
            return
        }
    }

    function showPasswordInput(e) {
        const show = e.target.checked
        setShowPassword(show)
    }

    return <>
        <NavBar></NavBar>
        <div className={'main-content'}>
            <div style={{ margin: "0 auto", paddingTop: "40px" }}>
                <h2>Log In</h2>
                <form className={"login-form"} onSubmit={submitData}>
                    <div className="login-form-tile">
                        <label htmlFor={"name"}>Username</label>
                        <input id={"name"} name="name"></input>
                    </div>
                    <div className="login-form-tile">
                        <label htmlFor={"password"}>Password</label>
                        <input id={"password"} type={`${showPassword ? "text" : "password"}`} name="password"></input>
                        <div className="row" style={{ width: "100%", padding: "10px", gap: "10px" }}>
                            <input type="checkbox" name="show-password" id="show-password" style={{ height: "20px", width: "20px" }} onClick={showPasswordInput}></input>
                            <label htmlFor="show-password">Show password</label>
                        </div>
                    </div>

                    <button className={`${isLoading ? 'loading-button' : ''}`}>Log In</button>
                </form>
            </div >
        </div >
    </>

}