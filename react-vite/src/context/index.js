import { useContext } from "react";
import { ModalProvider, Modal, ModalContext } from "./Modal";
import { StoreProvider, StoreContext } from "./Store";

const useModal = () => useContext(ModalContext);
const useStore = () => useContext(StoreContext);

export { ModalProvider, Modal, useModal, StoreProvider, useStore };