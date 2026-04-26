import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    const name = session?.user?.name;
    const email = session?.user?.email;
    const body = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: email ?? "" },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Account already exists. Please sign in.",
        },
        { status: 400 },
      );
    }

    const { companyname } = body;
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const tenant = await prisma.tenant.create({
      data: {
        name: companyname,
        inviteCode: inviteCode,
      },
    });

    const user = await prisma.user.create({
      data: {
        name: name ?? "",
        email: email ?? "",
        tenantId: tenant.id,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      tenantId: tenant.id,
    });
  } catch (error) {
    console.log("Internal server error  ", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
