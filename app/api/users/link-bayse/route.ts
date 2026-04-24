import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (
    !request.headers.get("authorization") ||
    !request.headers.get("X-User-Id")
  ) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }
}
