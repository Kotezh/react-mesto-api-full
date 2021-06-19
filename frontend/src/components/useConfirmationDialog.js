import React, { useCallback, useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup.js";

export default function useConfirmationDialog({
  title,
  name,
  //isOpen,
  onClose,
  btnName,
  onCardDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const Dialog = useCallback(
    () => (
      <ConfirmationPopup
        title={title}
        name={name}
        //isOpen={isOpen}
        onClose={onClose}
        btnName={btnName}
        onCardDelete={onCardDelete}
      />
    ),
    [isOpen]
  );

  return {
    Dialog,
    onOpen,
  };
}
