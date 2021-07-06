import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <main className="content">
      <section className="sign">
        <div className="sign__container">
          <h2 className="sign__title">Вход</h2>
          <form
            noValidate
            className="sign__form"
            name="sign-form"
            onSubmit={handleSubmit}
            action="#"
            method="post"
          >
            <label className="sign__form-field">
              <input
                name="email"
                placeholder="Email"
                id="email"
                type="email"
                className="sign__input"
                value={email}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="40"
                pattern="^(\w+([-.]\w+)*@\w+(\.\w{2,})+)$"
                autoComplete="off"
              />
              <span
                className="popup__error"
                id="email-error"
              >Некорректный формат email</span>
            </label>
            <label className="sign__form-field">
              <input
                name="password"
                placeholder="Пароль"
                id="password"
                type="password"
                className="sign__input"
                value={password}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="200"
                pattern="^.{2,}$"
                autoComplete="off"
              />
              <span
                className="popup__error"
                id="password-error"
              >Заполните поле</span>
            </label>
            <button
              name="submit"
              type="submit"
              className="sign__btn-submit"
              value="Сохранить"
            >
              Войти
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

