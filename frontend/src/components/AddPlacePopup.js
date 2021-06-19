import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  function handleChange(e) {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "link") {
      setLink(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnName="Создать"
    >
      <label className="popup__form-field">
        <input
          name="title"
          id="place-title"
          type="text"
          className="popup__input popup__input_type_place-title"
          value={title}
          onChange={handleChange}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          pattern="^[a-zA-Zа-яёА-ЯЁ0-9]{3,29}$"
          autoComplete="off"
        />
        <span className="popup__error" id="place-title-error">
          Поле должно содержать не менее 2 символов
        </span>
      </label>
      <label className="popup__form-field">
        <input
          name="link"
          id="place-link"
          type="url"
          className="popup__input popup__input_type_place-link"
          value={link}
          onChange={handleChange}
          placeholder="Ссылка на картинку"
          required
          pattern="^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$"
          autoComplete="off"
        />
        <span className="popup__error" id="place-link-error">
          {" "}
          Некорректная ссылка
        </span>
      </label>
    </PopupWithForm>
  );
}
