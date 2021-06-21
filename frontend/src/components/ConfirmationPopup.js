import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup(props) {
  const handleCardDelete = (evt) => {
    evt.preventDefault();
    props.onCardDelete(props.card)
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleCardDelete}
      btnName="Да"
    />
  );
}

