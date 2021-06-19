export default function PopupWithForm(props) {
  const openedClass = props.isOpen ? "popup_opened" : "";
  function handleOverlayClick(evt) {
    if(evt.target === evt.currentTarget){
      props.onClose()
    }
  }

  return (
    <section className={`popup popup_type_${props.name} ${openedClass}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        {props.title && <h2 className="popup__title">{props.title}</h2>}
        <button
          type="reset"
          aria-label="Close"
          className="popup__close popup__close_type_edit-profile"
          onClick={props.onClose}
        ></button>
        <form
          noValidate
          className="popup__form"
          name="edit-form"
          onSubmit={props.onSubmit}
          action="#"
          method="post"
        >
          {props.children}
          {props.btnName && (
            <button
              name="submit"
              type="submit"
              className="popup__btn-submit"
              value="Сохранить"
            >
              {props.btnName}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
