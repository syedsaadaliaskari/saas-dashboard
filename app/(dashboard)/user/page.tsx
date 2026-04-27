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

  const chartData = Object.entries(usersByDate)
    .map(([date, count]) => ({
      date,
      users: count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="w-full flex flex-col gap-1 px-4 sm:px-8 py-5 sm:py-6 bg-slate-900 text-white">
        <h1 className="text-xl sm:text-2xl font-bold">
          Welcome, {session?.user?.name} 👋
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          {tenant?.name} · Member since:{" "}
          {new Date(user?.createdAt ?? "").toLocaleDateString()}
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="p-3 sm:p-5 bg-slate-800 text-white text-center">
            <CardHeader className="p-0 mb-1 sm:mb-2">
              <CardTitle className="text-sm sm:text-base">Company</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm sm:text-base truncate">{tenant?.name}</p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-5 bg-indigo-600 text-white text-center">
            <CardHeader className="p-0 mb-1 sm:mb-2">
              <CardTitle className="text-sm sm:text-base">Role</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm sm:text-base">{session?.user?.role}</p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-5 bg-violet-600 text-white text-center">
            <CardHeader className="p-0 mb-1 sm:mb-2">
              <CardTitle className="text-sm sm:text-base">
                Member Since
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs sm:text-base">
                {new Date(user?.createdAt ?? "").toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-5 bg-emerald-600 text-white text-center">
            <CardHeader className="p-0 mb-1 sm:mb-2">
              <CardTitle className="text-sm sm:text-base">Team Size</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm sm:text-base">{tenantUsers.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm mt-4 sm:mt-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Team Composition
          </h2>
          <div className="w-full overflow-x-auto">
            <RoleDistributionChart data={roleData} />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm mt-4 sm:mt-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Team Growth
          </h2>
          <div className="w-full overflow-x-auto">
            <UserGrowthChart data={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
}
