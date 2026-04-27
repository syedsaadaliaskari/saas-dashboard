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

  const chartData = Object.entries(usersByDate)
    .map(([date, count]) => ({
      date,
      users: count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-800">
        Analytics
      </h1>
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-700">
          User Growth
        </h2>
        <div className="w-full overflow-x-auto">
          <UserGrowthChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
