import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil';

export type ModalId = 'test1' | 'test2';

export interface ModalInfo {
  id: ModalId;
  isOpen: boolean;
  title: string;
}

export const modalIdsAtom = atom<ModalId[]>({
  key: 'modalIdsAtom',
  default: [],
});

const modalsAtomFamily = atomFamily<ModalInfo, ModalId>({
  key: 'modalsAtomFamily',
  default: (id) => ({
    id,
    isOpen: false,
    title: '',
  }),
});

export const modalsSelectorFamily = selectorFamily<ModalInfo, ModalId>({
  key: 'modalsSelectorFamily',
  get:
    (modalId) =>
    ({ get }) =>
      get(modalsAtomFamily(modalId)),
  set:
    (modalId) =>
    ({ get, set, reset }, modalInfo) => {
      if (modalInfo instanceof DefaultValue) {
        reset(modalsAtomFamily(modalId));
        set(modalIdsAtom, (prevValue) =>
          prevValue.filter((item) => item !== modalId)
        );
        return;
      }

      set(modalsAtomFamily(modalId), modalInfo);
      set(modalIdsAtom, (prev) => Array.from(new Set([...prev, modalInfo.id])));
    },
});
