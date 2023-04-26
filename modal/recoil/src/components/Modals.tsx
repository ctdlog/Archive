import { useRecoilValue } from 'recoil';

import Modal from './Modal';
import TestModal1 from './TestModal1';
import TestModal2 from './TestModal2';
import { modalIdsAtom } from '../store/modal';

export const MODAL_COMPONENTS = {
  test1: TestModal1,
  test2: TestModal2,
};

const Modals = () => {
  const modalIds = useRecoilValue(modalIdsAtom);

  return (
    <>
      {modalIds.map((modalId) => {
        const ModalComponent = MODAL_COMPONENTS[modalId];

        return (
          <Modal key={modalId}>
            <ModalComponent />
          </Modal>
        );
      })}
    </>
  );
};

export default Modals;
