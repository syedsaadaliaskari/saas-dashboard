"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { makeAdmin, removeUser } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UserTable({ users }: any) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">
              Email
            </TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">
              Joined
            </TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id} className="hover:bg-slate-50">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="hidden sm:table-cell text-slate-500">
                {user.email}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    user.role === "ADMIN"
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-slate-500 hover:bg-slate-600"
                  }
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-slate-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => makeAdmin(user.id)}
                  >
                    Make Admin
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="text-xs"
                    onClick={() => removeUser(user.id)}
                  >
                    Remove
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
