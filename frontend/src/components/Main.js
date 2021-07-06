import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onConfirm, onCardClick, onCardLike, onCardDelete, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setIsLoading(true);
  // })

  return (
    <main className="content">
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
        {isLoading ?
          <Spinner /> :
          <ul className="elements__list">
            {props.cards.map((card) => (
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
        }
      </section>
    </main>
  );
}
