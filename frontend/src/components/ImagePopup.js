import React, { useEffect, useState } from "react";

export default function ImagePopup({ card, onClose }) {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const openedClass = card ? "popup_opened" : "";
  
  function handleOverlayClick(evt) {
    if(evt.target === evt.currentTarget){
      onClose()
    }
  }
  
  useEffect(() => {
    if(card) {
      setLink(card.link);
      setName(card.name);
    }
  }, [card]);

  return (
    <section className={`popup popup_type_full-image ${openedClass}`} onClick={handleOverlayClick}>
      <div className="popup__full-image-wrapper">
        <figure className="popup__figure">
          <img className="popup__full-image" src={link} alt={name} />
          <figcaption className="popup__full-image-caption">{name}</figcaption>
        </figure>
        <button
          type="reset"
          aria-label="Close"
          className="popup__close popup__close_type_full-image"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}
