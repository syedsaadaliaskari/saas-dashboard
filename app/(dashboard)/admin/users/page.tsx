import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UserTable from "../UserTable";

export default async function UsersPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  const tenantId = session?.user?.tenantId;

  const users = await prisma.user.findMany({
    where: { tenantId: tenantId },
  });

  return (
    <div className="max-w-4xl mx-auto px-5">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <UserTable users={users} />
    </div>
  );
}
