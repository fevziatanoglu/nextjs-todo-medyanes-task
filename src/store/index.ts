import { create } from 'zustand';
import { createAuthSlice, AuthStore } from './slices/authStore';
import { createModalSlice, ModalStore } from './slices/modalStore';
import { createTodoSlice, TodoStore } from './slices/todoStore';

type RootStore = AuthStore & ModalStore & TodoStore;

const useRootStore = create<RootStore>()((set , get) => ({
  ...createAuthSlice(set , get),
  ...createModalSlice(set),
  ...createTodoSlice(set, get)
}));

export default useRootStore;
