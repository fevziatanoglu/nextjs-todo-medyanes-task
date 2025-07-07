import React from 'react';

export type ModalStore = {
  isOpen: boolean;
  modalTitle?: string;
  modalChild: React.ReactNode | null;
  openModal: (modalChild: React.ReactNode, modalTitle: string) => void;
  closeModal: () => void;
};

export const createModalSlice = (set: any): ModalStore => ({
  isOpen: false,
  modalChild: undefined,
  openModal: (modalChild, modalTitle) => {
    set({ isOpen: true, modalChild, modalTitle });
  },
  closeModal: () => {
    set({ isOpen: false, modalChild: null, modalTitle: undefined });
  },
});
