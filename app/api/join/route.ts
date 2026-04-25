import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  const email = session?.user?.email;
  const user = session?.user?.name;

  const body = await request.json();
  const { inviteCode } = body;

  const tenant = await prisma.tenant.findUnique({
    where: { inviteCode: inviteCode },
  });

  if (!tenant)
    return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });

  await prisma.user.create({
    data: {
      name: user ?? "",
      email: email ?? "",
      tenantId: tenant.id,
      role: "USER",
    },
  });

  return NextResponse.json({ success: true });
}
