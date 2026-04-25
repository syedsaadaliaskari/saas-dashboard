import { Sidebar } from "./Sidebar";
export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex flex-row ">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
