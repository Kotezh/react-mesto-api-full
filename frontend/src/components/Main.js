import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} className="avatar" alt="аватар" />
          </div>
          <div className="profile__text">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__btn-edit"
                onClick={props.onEditProfile}
                type="button"
                aria-label="Edit"
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__btn-add"
          onClick={props.onAddPlace}
          type="button"
          aria-label="Add"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onConfirm={props.onConfirm}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
