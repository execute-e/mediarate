import { NextRequest, NextResponse } from "next/server";
import { Schema } from "@/src/shared/api/lib/api-types";
import { proxyAuthSession } from "@/src/shared/api/lib/auth-session";

export async function POST(req: NextRequest) {
  let dto: Schema<"LoginDto">;
  try {
    dto = await req.json();
  } catch {
    return NextResponse.json(
      { statusCode: 400, message: "Invalid JSON body", error: "Bad Request" },
      { status: 400 },
    );
  }

  return proxyAuthSession("auth/login", dto);
}
