"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function fetchTodosAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
  });
  return todos;
}

export async function addTodoAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  if (!title) throw new Error("Title is required");

  await prisma.todo.create({
    data: { title, completed: false, userId: session.user.id },
  });

  revalidatePath("/home-with-actions");
}

export async function updateTodoAction(id: string, updates: { title?: string; completed?: boolean }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.todo.update({
    where: { id, userId: session.user.id },
    data: updates,
  });

  revalidatePath("/home-with-actions");
}

export async function deleteTodoAction(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.todo.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/home-with-actions");
}
