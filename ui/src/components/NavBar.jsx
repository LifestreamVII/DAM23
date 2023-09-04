import { Link } from "react-router-dom"
import logo from '../assets/images/logo.svg';
import search from '../assets/images/icon-search.svg';
import profile from '../assets/images/icon-profile.svg';

function SearchBar() {
    return (
        <div className="searchbar">
            <input className="searchbar__input" type="text" placeholder="Rechercher" />
            <button className="searchbar__button">
                <img className="searchbar__icon" src={search} alt="" />
            </button>
        </div>
    )
}

export default function NavBar() {
    return (
        <nav className="navbar border-bottom">
            <div className="navbar__wrapper">
                <Link to='/'>
                    <img className="navbar__logo" src={logo} alt="Saline Royale Academy" />
                </Link>
                <SearchBar />
                <Link to="/login" className="login-link">
                    <img className="login-link__icon" src={profile} alt="" />
                    <span>Connexion</span>
                </Link>
            </div>
        </nav>
    )
}