import React from "react";
import logo from "../blocks/logo/logo.svg";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Header({ email, onSignOut, onClose, onBurgerClick, isOpen }) {
  const currentLocation = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 425 });

  return (
    <header className="header">
      <img src={logo} className="logo header__logo" alt="Логотип" />
      {currentLocation.pathname === "/" && (
        <div className="header__logged">
          <p className="header__text">{email}</p>
          <button className="header__link" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      )}
      {currentLocation.pathname === "/" && isMobile && (
        <div className="header__logged">
          <button
            className="burger-button"
            type="button"
            aria-label="Open"
            onClick={onBurgerClick}
          ></button>
        </div>
      )}
      <BurgerMenu isOpen={isOpen} onClose={onClose} onSignOut={onSignOut} email={email}/>
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
