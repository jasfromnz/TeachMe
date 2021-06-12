import { login, logout } from '../../services/firebase';
import './Header.css';

const Header = (props) => {
    return (
        <header>
            <h1>TeachMe</h1>
            <nav>
                <a href="/">Home</a>
                { props.user ?
                <> 
                    <img src={props.user.photoURL} alt=""></img>
                    <a href={'/user'}>{props.user.displayName}</a>
                    <button onClick={logout}>Logout</button>
                </>
                :
                <button onClick={login}>Login</button>
                }
            </nav>
        </header>
    )
}


export default Header;