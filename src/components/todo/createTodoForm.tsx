'use client';

import { useForm } from "react-hook-form";
import useRootStore from "@/store";
import SubmitButton from "@/components/global/submitButton";

export default function CreateTodoForm() {
  const { addTodo, isTodoLoading } = useRootStore();
  const form = useForm<{ title: string }>({
    defaultValues: { title: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    await addTodo(data.title);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2 mb-4">
      <input
        {...form.register("title", { required: "Title is required" })}
        placeholder="Add a new todo"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <SubmitButton
        text="Add"
        isLoading={isTodoLoading}
        disabled={!form.formState.isValid}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      />
    </form>
  );
}
