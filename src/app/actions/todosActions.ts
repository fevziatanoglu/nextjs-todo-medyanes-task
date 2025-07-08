"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function fetchTodosAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
  });
  return todos;
}

export async function addTodoAction(title:string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  if (!title) throw new Error("Title is required");

  const todo = await prisma.todo.create({
    data: { title, completed: false, userId: session.user.id },
  });

  return todo;
}

export async function updateTodoAction(id: string, updates: { title?: string; completed?: boolean }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const updatedTodo = await prisma.todo.update({
    where: { id, userId: session.user.id },
    data: updates,
  });

  return updatedTodo
}

export async function deleteTodoAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const deletedTodo =  await prisma.todo.delete({
    where: { id, userId: session.user.id },
  });

  return deletedTodo
}
