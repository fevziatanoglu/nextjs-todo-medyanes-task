'use client';

import { useEffect } from "react";
import useRootStore from "@/store";
import TodoItem from "./todoItem";

export default function TodoList() {
  const { todos, fetchTodos, updateTodo, deleteTodo } = useRootStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (!todos.length) {
    return <div className="text-gray-500 text-center mt-8">No todos yet.</div>;
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={(id) => updateTodo(id, { completed: !todo.completed })}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      ))}
    </div>
  );
}
