import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoleDistributionChart from "../admin/RoleDistributionChart";
import UserGrowthChart from "../analytics/UserGrowthChart";

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

  const tenantUsers = await prisma.user.findMany({
    where: { tenantId: session?.user?.tenantId },
  });

  const roleData = [
    {
      name: "Admins",
      value: tenantUsers.filter((u) => u.role === "ADMIN").length,
    },
    {
      name: "Users",
      value: tenantUsers.filter((u) => u.role === "USER").length,
    },
  ];

  const usersByDate = tenantUsers.reduce(
    (acc, user) => {
      const date = new Date(user.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(usersByDate).map(([date, count]) => ({
    date,
    users: count,
  }));
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="w-full flex flex-col gap-1 px-8 py-6 bg-slate-900 text-white">
        <h1 className="text-2xl font-bold">
          Welcome, {session?.user?.name} 👋
        </h1>

        <p className="text-slate-400 text-sm">
          {tenant?.name} · Member since:{" "}
          {new Date(user?.createdAt ?? "").toLocaleDateString()}
        </p>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex gap-4 max-w-4xl mx-auto mb-6">
          <Card className="flex-1 p-5 bg-slate-800 text-white text-center">
            <CardHeader>
              <CardTitle>Company</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tenant?.name}</p>
            </CardContent>
          </Card>

          <Card className="flex-1 p-5 bg-indigo-600 text-white text-center">
            <CardHeader>
              <CardTitle>Role</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{session?.user?.role}</p>
            </CardContent>
          </Card>

          <Card className="flex-1 p-5 bg-violet-600 text-white text-center">
            <CardHeader>
              <CardTitle>Member Since</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{new Date(user?.createdAt ?? "").toLocaleDateString()}</p>
            </CardContent>
          </Card>
          <Card className="flex-1 p-5 bg-emerald-600 text-white text-center">
            <CardHeader>
              <CardTitle>Team Size</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tenantUsers.length}</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm mt-6 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Team Composition</h2>
          <RoleDistributionChart data={roleData} />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mt-6 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Team Growth</h2>
          <UserGrowthChart data={chartData} />
        </div>
      </main>
    </div>
  );
}
