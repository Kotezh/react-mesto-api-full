import React from "react";
import { NavLink } from "react-router-dom";

export default function BurgerMenu({ onClose, isOpen, onSignOut, email }) {
  const openedClass = isOpen ? "burger-menu_opened" : "";
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`burger-menu ${openedClass}`}
      onClick={handleOverlayClick}
    >
      <div className="burger-menu__container">
        <button
          type="reset"
          aria-label="Close"
          className="burger-menu__close"
          onClick={onClose}
        ></button>

        <div className="burger-menu__links">
          <NavLink
            exact
            to="/"
            onClick={onClose}
            activeClassName="burger-menu__link_active"
            className="burger-menu__link"
          >
            Главная
          </NavLink>
          <p className="burger__text">{email}</p>
          <button className="burger__button" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      </div>
    </section>
  );
}
