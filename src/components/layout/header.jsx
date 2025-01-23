import { Link, NavLink } from "react-router-dom";
import "./header.css"
const Header = () => {
    return (
        <ul>
            <li><NavLink to="#home">Home</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
        </ul>

    );
}

export default Header