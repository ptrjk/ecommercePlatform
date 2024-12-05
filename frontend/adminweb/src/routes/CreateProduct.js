import { useNavigate } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { NavBar } from "../components/NavBar";
import { useContext, useEffect, useState } from "react";
import backIcon from '../assets/back.svg';
import { notifyBarContext } from "../App";

export default function CreateProductPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [showBar, showBarFunc] = useContext(notifyBarContext)

    useEffect(() => {
        async function loadData() {
            const res = await fetch('http://localhost:1880/verifyTokenValidity', { method: 'GET', credentials: 'include' })
            const token = await res.json()
            if (token.redirect === true) {
                navigate('/login', { replace: true })
            }
        }
        loadData()

    }, [])

    async function submitData(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        let data = {};
        for (const [keys, values] of formData.entries()) {
            data[keys] = values;
        }

        console.log(data)
        if (data.title.length === 0) {
            setError('You have to set title!')
            return
        } else if (data.desc.length === 0) {
            setError('You have to set description!')
            return
        }
        else if (data.file.size === 0) {
            setError('You have to set file!')
            return
        } else if (data.price.length === 0) {
            setError('You have to set price!')
            return
        }

        setIsLoading(true)

        const response = await fetch('http://localhost:1880/createproduct', {
            method: 'POST',
            body: formData,
        });
        const resData = await response.json()
        if (resData.ok) {
            showBarFunc('Product was created.')
            navigate('/', { replace: true })
        }
        setIsLoading(false)
    }

    return <>
        <section className={"main-section"}>
            <LeftBar />
            <div className={"right-content"}>
                <NavBar />
                <div className={"main-content"} style={{ paddingTop: "20px" }}>
                    <div className={"col"} style={{ justifyContent: "space-between", alignItems: "start", width: "100%", marginBottom: "50px" }} >
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }} onClick={() => navigate(-1)}>
                            <img src={backIcon} alt="back icon" style={{ width: "20px" }} />
                            <p>Back</p>
                        </div>

                        <h2>Create a new product</h2>
                    </div>
                    <form className="form" onSubmit={submitData}>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input name="title"></input>
                        </div>
                        <div>
                            <label htmlFor="desc">Description</label>
                            <textarea name="desc"></textarea>
                        </div>
                        <div>
                            <label htmlFor="file">File</label>
                            <label htmlFor="file" className="file-input-label">Choose File</label>
                            <input type="file" name="file" id="file" className="file-input"></input>
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <select name="category">
                                <option value="kitchen">Kitchen</option>
                                <option value="bedroom">Bedroom</option>
                                <option value="living-room">Living Room</option>
                                <option value="bathroom">Bathroom</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price"></input>
                        </div>
                        <div style={{ alignItems: "start" }}>
                            <p style={{ color: "red", fontWeight: "500", fontSize: "14px" }}>{error}</p>
                        </div>
                        <button type="submit" className={`${isLoading ? 'loading-button' : ''}`}>Create</button>
                    </form>
                </div>
            </div>
        </section >
    </>
}