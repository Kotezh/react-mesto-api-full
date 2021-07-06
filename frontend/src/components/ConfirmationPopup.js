import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({card, onCardDelete, isOpen, onClose}) {
  const handleCardDelete = (evt) => {
    evt.preventDefault();
    onCardDelete(card)
  }
  
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCardDelete}
      btnName="Да"
    />
  );
}

