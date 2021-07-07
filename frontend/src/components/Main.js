import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";

export default function Main({ isLoading, cards, onEditAvatar, onEditProfile, onAddPlace, onConfirm, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      {isLoading ?
      <Spinner /> :(
      <>
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar" onClick={onEditAvatar}>
              <img src={currentUser.avatar} className="avatar" alt="аватар" />
            </div>
            <div className="profile__text">
              <div className="profile__name-wrapper">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  className="profile__btn-edit"
                  onClick={onEditProfile}
                  type="button"
                  aria-label="Edit"
                ></button>
              </div>
              <p className="profile__job">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__btn-add"
            onClick={onAddPlace}
            type="button"
            aria-label="Add"
          ></button>
        </section>
        <section className="elements">
            <ul className="elements__list">
              {cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onConfirm={onConfirm}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              ))}
            </ul>
        </section>
      </>
      )}
    </main>
  )
}
