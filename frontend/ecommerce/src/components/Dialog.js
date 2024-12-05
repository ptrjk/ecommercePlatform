

export default function PopUpDialog({ title, desc, func }) {
    return <div className="overlay">
        <div className="dialog">
            <h2>{title}</h2>
            <p>{desc}</p>
            <div className="row">
                <button className="approve" onClick={() => func(false)}>No</button>
                <button className="cancel" onClick={() => func(true)}>Yes</button>
            </div>
        </div>
    </div>
}