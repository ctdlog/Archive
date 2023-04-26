import { useRecoilState, useResetRecoilState } from 'recoil';

import { ModalId, modalsSelectorFamily } from '../store/modal';

const useModal = (modalId: ModalId) => {
  const [modal, setModal] = useRecoilState(modalsSelectorFamily(modalId));
  const resetModal = useResetRecoilState(modalsSelectorFamily(modalId));

  const openModal = () => {
    setModal((current) => ({ ...current, isOpen: true }));
  };

  const hideModal = () => {
    setModal((current) => ({ ...current, isOpen: false }));
  };

  const closeModal = () => {
    resetModal();
  };

  return { modal, setModal, openModal, hideModal, closeModal };
};

export default useModal;
