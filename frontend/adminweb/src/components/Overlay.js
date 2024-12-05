

export default function Overlay({ toggleOverlay }) {
    return <div className="overlay">
        <div className="overlay-content">
            <h1>Are you sure?</h1>
            <p>Do you want to delete this product?</p>
            <div className="row">
                <button onClick={() => toggleOverlay(-1)} style={{ color: "#5d5d5d" }}>No</button>
                <button className="btn-remove" onClick={() => toggleOverlay(1)}>Yes</button>
            </div>
        </div>

    </div>;
}