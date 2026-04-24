"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removeUser(userId: string) {
  await prisma.user.delete({
    where: { id: userId },
  });
  revalidatePath("/admin");
}

export async function makeAdmin(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
  });
  revalidatePath("/admin");
}
