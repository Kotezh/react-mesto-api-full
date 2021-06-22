import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { ESC_KEYCODE } from "../utils/constants";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import avatar from "../blocks/profile/__avatar/edit-avatar.svg";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    _id: 0,
    name: "",
    about: "",
    avatar: avatar,
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setISEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  function getInfo() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, initialCards]) => {
        setCurrentUser(data.data);
        setCards(initialCards.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    auth
      .checkToken('')
      .then((data) => {
        if (data.data.email) {
          setEmail(data.data.email);
          getInfo();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.data.name, about: res.data.about });
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .setNewAvatar(newAvatar)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.data.avatar });
        setISEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(data) {
    api
      .addNewCard(data.title, data.link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        setIsAddPlacePopupOpen(false);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEscClose(evt) {
    const key = evt.keyCode;
    if (key === ESC_KEYCODE) {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setISEditAvatarPopupOpen(true);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleConfirmClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    document.addEventListener("keydown", handleEscClose);
  }

  function closeAllPopups() {
    setISEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    document.removeEventListener("keydown", handleEscClose);
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        history.push("/signin");
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token === 'ok') {
          setEmail(email);
          getInfo();
          history.go(0).push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmail("");
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} onSignOut={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onClose={closeAllPopups}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmClick}
              cards={cards}
              loggedIn={email ? true : false}
            />

            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="*">
              <Redirect to="/signin" />
            </Route>
          </Switch>

          <Footer />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            success={isSuccess}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmationPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            card={deletedCard}
            onCardDelete={handleCardDelete}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
