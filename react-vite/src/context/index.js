import { useContext } from "react";
import { ModalProvider, Modal, ModalContext } from "./Modal";

const useModal = () => useContext(ModalContext);

export { ModalProvider, Modal, useModal };