import logo from "../blocks/logo/logo.svg";
import { useLocation, Link } from "react-router-dom";

export default function Header(props) {
  const currentLocation = useLocation();
  return (
    <header className="header">
      <img src={logo} className="logo header__logo" alt="Логотип" />
      {currentLocation.pathname === "/" && (
        <div className="header__logged">
          <p className="header__text">{props.email}</p>
          <button className="header__link" onClick={props.onSignOut}>
            Выйти
          </button>
        </div>
      )}
      {currentLocation.pathname === "/signup" && (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      )}
      {currentLocation.pathname === "/signin" && (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
    </header>
  );
}
