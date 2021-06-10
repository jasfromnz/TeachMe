import { login, logout } from '../../services/firebase';
import './Header.css';

const Header = (props) => {
    return (
        <header>
            <h1>TeachMe</h1>
            <nav>
                <a href="/">Home</a>
                <p onClick={login}>Login</p>
                <p onClick={logout}>Logout</p>
            </nav>
        </header>
    )
}


export default Header;