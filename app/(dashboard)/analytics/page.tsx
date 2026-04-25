import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UserGrowthChart from "./UserGrowthChart";

export default async function UserAnalytics() {
  const session = await auth();
  if (!session) redirect("/signin");

  const users = await prisma.user.findMany({
    where: { tenantId: session?.user?.tenantId },
    select: {
      createdAt: true,
      name: true,
      role: true,
    },
  });

  const usersByDate = users.reduce(
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
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Analytics</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-slate-700">
          User Growth
        </h2>
        <UserGrowthChart data={chartData} />
      </div>
    </div>
  );
}
