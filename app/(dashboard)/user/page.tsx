import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UserDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  const tenant = await prisma.tenant.findUnique({
    where: { id: session?.user?.tenantId },
  });
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="w-full flex flex-col gap-1 px-8 py-6 bg-slate-900 text-white">
        <h1 className="text-2xl font-bold">
          Welcome, {session?.user?.name} 👋
        </h1>

        <p className="text-slate-400 text-sm">
          {tenant?.name} . Member since:{" "}
          {new Date(user?.createdAt ?? "").toLocaleDateString()}
        </p>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <Card className="flex-1 p-5 shadow-sm bg-slate-800 text-white text-center">
          <CardHeader>
            <CardTitle>Your Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Company: {tenant?.name}</p>
            <p>Role: {session?.user?.role}</p>
            <p>
              Member since:{" "}
              {new Date(user?.createdAt ?? "").toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
