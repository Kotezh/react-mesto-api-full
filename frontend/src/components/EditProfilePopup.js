import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChange(e) {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "job") {
      setDescription(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnName="Сохранить"
    >
      <label className="popup__form-field">
        <input
          name="name"
          id="name"
          type="text"
          className="popup__input popup__input_type_name"
          value={name}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="40"
          pattern="^[a-zA-Zа-яёА-ЯЁ0-9 -]{2,40}$"
          autoComplete="off"
        />
        <span className="popup__error" id="name-error">
          Поле должно содержать не менее 2 символов
        </span>
      </label>
      <label className="popup__form-field">
        <input
          name="job"
          id="job"
          type="text"
          className="popup__input popup__input_type_job"
          value={description}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="200"
          pattern="^[a-zA-Zа-яёА-ЯЁ0-9 -]{2,200}$"
          autoComplete="off"
        />
        <span className="popup__error" id="job-error">
          Поле должно содержать не менее 2 символов
        </span>
      </label>
    </PopupWithForm>
  );
}
