import { Link } from "react-router-dom";

export default function CategoryItem({ categoryClass, title, destination }) {
    return (
        <Link to={`/${destination}`} className={`grid-item ${categoryClass}`}>
            <div>
                <p>{title}</p>
            </div>
        </Link>
    );
}
