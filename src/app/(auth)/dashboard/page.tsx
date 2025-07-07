'use client';

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import TodoList from "@/components/todo/todoList";
import useRootStore from "@/store";
import CreateTodoForm from "@/components/todo/createTodoForm";

export default function TodosPage() {
  const [newTodo, setNewTodo] = useState<string>("");
  const { addTodo } = useRootStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Todo Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your tasks and boost your productivity
          </p>
        </div>

        <CreateTodoForm />

        {/* Todo List */}
        <TodoList />
      </div>
    </div>
  );
}
