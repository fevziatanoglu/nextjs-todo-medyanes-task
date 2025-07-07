import { create } from 'zustand';
import { createAuthSlice, AuthStore } from './slices/authStore';
import { createModalSlice, ModalStore } from './slices/modalStore';

type RootStore = AuthStore & ModalStore;

const useRootStore = create<RootStore>()((set) => ({
  ...createAuthSlice(set),
  ...createModalSlice(set),
}));

export default useRootStore;
