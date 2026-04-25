import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./CopyButton";
import RoleDistributionChart from "./RoleDistributionChart";

export default async function AdminDashboard() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!session || !tenantId) {
    redirect("/signin");
  }

  const users = await prisma.user.findMany({
    where: { tenantId: tenantId },
  });

  const roleData = [
    { name: "Admins", value: users.filter((u) => u.role === "ADMIN").length },
    { name: "Users", value: users.filter((u) => u.role === "USER").length },
  ];
  const tenant = await prisma.tenant.findUnique({
    where: {
      id: tenantId,
    },
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="w-full flex flex-col gap-1 px-8 py-6 bg-slate-900 text-white">
        <h1 className="text-2xl font-bold">
          Welcome, {session?.user?.name} 👋
        </h1>
        <p className="text-slate-400 text-sm">
          {tenant?.name} · {session?.user?.role}
        </p>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex gap-4 p-5 max-w-4xl mx-auto">
          <Card className="flex-1 p-5 shadow-sm bg-slate-800 text-white text-center">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{users.length}</p>
            </CardContent>
          </Card>

          <Card className="flex-1 p-5 shadow-sm bg-indigo-600 text-white text-center">
            <CardHeader>
              <CardTitle>Total Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{users.filter((u) => u.role === "ADMIN").length}</p>
            </CardContent>
          </Card>

          <Card className="flex-1 p-5 shadow-sm bg-violet-600 text-white text-center">
            <CardHeader>
              <CardTitle>Invite Code</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tenant?.inviteCode}</p>
              <CopyButton code={tenant?.inviteCode ?? ""} />
            </CardContent>
          </Card>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm mt-6 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Role Distribution</h2>
          <RoleDistributionChart data={roleData} />
        </div>
      </main>
    </div>
  );
}
