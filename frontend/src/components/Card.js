import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `trash element__trash ${isOwner && "element__trash_active"
    }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `heart element__heart ${isLiked ? "heart_active" : ""
    }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <div className="element__image-wrapper">
        <div className="element__popup" onClick={handleClick}>
          <img
            className="element__image"
            alt={card.title}
            src={card.link}
          />
        </div>
      </div>
      <div className="element__field">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            aria-label="Like"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__likes-number">
            {card.likes.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        aria-label="Trash"
      ></button>
    </li>
  );
}
