import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `trash element__trash ${isOwn && "element__trash_active"
    }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `heart element__heart ${isLiked ? "heart_active" : ""
    }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <div className="element__image-wrapper">
        <div className="element__popup" onClick={handleClick}>
          <img
            className="element__image"
            alt={props.card.title}
            src={props.card.link}
          />
        </div>
      </div>
      <div className="element__field">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            aria-label="Like"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__likes-number">
            {props.card.likes.length}
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
