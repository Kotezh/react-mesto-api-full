import React, { useState } from "react";
import {useMediaQuery} from 'react-responsive';
import logo from "../blocks/logo/logo.svg";
import { useLocation, Link } from "react-router-dom";
import cn from "classnames";

export default function Header({ email, onSignOut, }) {
  const currentLocation = useLocation();
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const isMobile = useMediaQuery({maxWidth: 768});

  function openBurger(){
    setIsBurgerMenuOpened(true)
  }
  function closeBurger(){
    setIsBurgerMenuOpened(false)
  }

  return (
    <header className="header">
      <img src={logo} className={cn("logo header__logo", {"header__logo_mobile": isMobile} )} alt="Логотип" />
      {currentLocation.pathname === "/" && !isMobile && (
        <div className="header__logged">
          <p className="header__text">{email}</p>
          <button className="header__link" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      )}
      {/* {currentLocation.pathname === "/" && isMobile && setIsBurgerMenuOpened(false) && (
        <button type="button" className="header__burger-menu-btn" openBurger={openBurger}></button>
      )}
      {currentLocation.pathname === "/" && isMobile && setIsBurgerMenuOpened(true) && (
        <>
          <button type="button" className="header__burger-menu-close-btn" isOpened={isBurgerMenuOpened} closeBurger={closeBurger}></button>
          <div className="header__logged">
            <p className="header__text">{email}</p>
            <button className="header__link" onClick={onSignOut}>
              Выйти
            </button>
          </div>
        </>
      )} */}
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
