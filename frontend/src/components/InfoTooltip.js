import React from "react";
import PopupWithForm from "./PopupWithForm";
import successImg from "../blocks/popup/__tooltip-icon/icon-success.svg";
import errorImg from "../blocks/popup/__tooltip-icon/icon-error.svg";

export default function InfoTooltip(props) {
  return (
    <PopupWithForm
      name={props.success ? "tooltip-success" : "tooltip-error"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="popup__tooltip">
        <img
          className="popup__tooltip-icon"
          src={props.success ? successImg : errorImg}
          alt="Иконка"
        />
        <p className="popup__tooltip-text">
          {props.success
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </PopupWithForm>
  );
}
