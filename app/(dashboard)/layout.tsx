import { auth } from "@/auth";
import { Sidebar } from "./Sidebar";

export default async function DashboardLayout({ children }: any) {
  const session = await auth();
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role={session?.user?.role} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
