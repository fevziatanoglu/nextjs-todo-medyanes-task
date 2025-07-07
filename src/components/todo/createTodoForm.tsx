'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Sparkles } from "lucide-react";
import useRootStore from "@/store";
import SubmitButton from "@/components/global/submitButton";
import HookFormInput from "@/components/global/hookFormInput";
import { todoSchema, TodoSchema } from "@/validation/todoValidation";



export default function CreateTodoForm() {
  const { addTodo, isTodoLoading } = useRootStore();
  
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: TodoSchema) => {
    await addTodo(data.title);
    form.reset();
  };

  return (
    <div className="mb-8">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
          <p className="text-sm text-gray-500">What would you like to accomplish?</p>
        </div>
      </div>

      {/* Form with glassmorphism effect */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-300">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full -translate-y-10 translate-x-10"></div>
        
        <div className="relative flex items-center gap-4">
          <div className="flex-1">
            <HookFormInput
              name="title"
              control={form.control}
              type="text"
              placeholder="What's on your mind? Add a new task..."
              className="w-full px-5 py-4 border-0 bg-gray-50/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white/90 transition-all duration-300 placeholder-gray-400 text-base font-medium shadow-inner"
            />
          </div>
          
          <SubmitButton
            text={
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <Plus className="w-3 h-3" />
                </div>
                <span className="hidden sm:inline font-semibold">Add Task</span>
              </div>
            }
            isLoading={isTodoLoading}
            disabled={!form.formState.isValid || isTodoLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          />
        </div>
      </form>
    </div>
  );
}
