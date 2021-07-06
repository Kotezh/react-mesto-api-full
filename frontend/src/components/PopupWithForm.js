export default function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children, btnName, }) {
  const openedClass = isOpen ? "popup_opened" : "";

  function handleOverlayClick(evt) {
    if(evt.target === evt.currentTarget){
      onClose()
    }
  }

  return (
    <section className={`popup popup_type_${name} ${openedClass}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        {title && <h2 className="popup__title">{title}</h2>}
        <button
          type="reset"
          aria-label="Close"
          className="popup__close popup__close_type_edit-profile"
          onClick={onClose}
        ></button>
        <form
          noValidate
          className="popup__form"
          name="edit-form"
          onSubmit={onSubmit}
          action="#"
          method="post"
        >
          {children}
          {btnName && (
            <button
              name="submit"
              type="submit"
              className="popup__btn-submit"
              value="Сохранить"
            >
              {btnName}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
