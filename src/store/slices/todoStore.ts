import { addTodoAction, deleteTodoAction, fetchTodosAction, updateTodoAction } from "@/app/actions/todosActions";
import { Todo } from "@/types/todo";
import React from "react";
import { toast } from "react-toastify";


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
      const todos = await fetchTodosAction();
      set({ todos });
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch todos');
    } finally {
      set({ isTodoLoading: false });
    }
  },
  addTodo: async (title) => {
    set({ isTodoLoading: true, error: null });
    try {
      const todo = await addTodoAction(title);
      if (todo) {
        toast.error('Failed to add todo');
      } else {
        toast.success('Todo added successfully');
        set({ todos: [...get().todos, todo] });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to add todo');
    } finally {
      set({ isTodoLoading: false });
    }
  },
  updateTodo: async (id, updates) => {
    set({ isTodoLoading: true, error: null });
    try {
      const updatedTodo = updateTodoAction(id, updates);
      if (!updatedTodo) {
        toast.error('Failed to update todo');
      } else {
        set({
          todos: get().todos.map((todo: Todo) =>
            todo.id === id ? { ...todo, updateTodoAction } : todo
          ),
        });
        toast.success('Todo updated successfully');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update todo');
    } finally {
      set({ isTodoLoading: false });
    }
  },
  deleteTodo: async (id) => {
    set({ isTodoLoading: true, error: null });
    try {
      const deletedTodo = deleteTodoAction(id);
      if (!deletedTodo) {
        toast.error('Failed to delete todo');
      } else {
        set({ todos: get().todos.filter((todo: Todo) => todo.id !== id) });
        toast.success(
          React.createElement(
            "div"
            , null,
            'Todo deleted successfully. ',
            React.createElement("button", {
              onClick: async () => {
                if (deletedTodo) {
                  const undoTodoRes = await fetch('/api/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(deletedTodo),
                  });
                  if (!undoTodoRes.ok) {
                    toast.error('Failed to restore todo');
                  } else {
                    set({ todos: [...get().todos, deletedTodo] });
                    toast.success('Todo restored successfully');
                  }

                }
              },
              className: 'text-red-500 underline hover:text-red-700',
            },
              'Undo',
            )
          )
        );
      }
    } catch (err) {
      toast.error('Failed to delete todo');
    } finally {
      set({ isTodoLoading: false });
    }
  },
});
