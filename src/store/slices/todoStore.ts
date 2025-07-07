import { Todo } from "@/types/todo";


export type TodoStore = {
  todos: Todo[];
  isTodoLoading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export const createTodoSlice = (set: any, get: any): TodoStore => ({
  todos: [],
  isTodoLoading: false,
  error: null,
  fetchTodos: async () => {
    set({ isTodoLoading: true, error: null });
    try {
      const res = await fetch('/api/todos');
      const data = await res.json();
      set({ todos: data.todos });
    } catch (err) {
      set({ error: 'Failed to fetch todos' });
    } finally {
      set({ isTodoLoading: false });
    }
  },
  addTodo: async (title) => {
    set({ isTodoLoading: true, error: null });
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      set({ todos: [...get().todos, data.todo] });
    } catch (err) {
      set({ error: 'Failed to add todo' });
      console.log(err)
    } finally {
      set({ isTodoLoading: false });
    }
  },
  updateTodo: async (id, updates) => {
    set({ isTodoLoading: true, error: null });
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      set({
        todos: get().todos.map((todo: Todo) =>
          todo.id === id ? { ...todo, ...data.todo } : todo
        ),
      });
    } catch (err) {
      set({ error: 'Failed to update todo' });
    } finally {
      set({ isTodoLoading: false });
    }
  },
  deleteTodo: async (id) => {
    set({ isTodoLoading: true, error: null });
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete todo');
      } else {
        set({ todos: get().todos.filter((todo: Todo) => todo.id !== id) });
      }
    } catch (err) {
      set({ error: 'Failed to delete todo' });
    } finally {
      set({ isTodoLoading: false });
    }
  },
});
