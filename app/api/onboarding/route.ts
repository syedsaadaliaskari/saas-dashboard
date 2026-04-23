import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    const name = session?.user?.name;
    const email = session?.user?.email;
    const body = await request.json();

    const { companyname } = body;

    const tenant = await prisma.tenant.create({
      data: {
        name: companyname,
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
