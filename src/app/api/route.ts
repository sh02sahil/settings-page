import { Prisma, PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface RequestBody {
  showNotifications: boolean;
  users: string[];
  messageCategories: string[];
  replies: string[];
}

export async function PUT(request: Request) {
  const body: RequestBody = await request.json();
  const res = await prisma.settings.upsert({
    where: { id: 1 },
    create: body,
    update: body,
  });
  return NextResponse.json(res);
}

export async function GET() {
  const res = await prisma.settings.findUnique({
    where: { id: 1 },
  });
  return NextResponse.json(res);
}
