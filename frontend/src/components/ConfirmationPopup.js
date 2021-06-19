import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup(props) {

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCardDelete={props.handleCardDelete}
      btnName="Да"
    />
  );
}

