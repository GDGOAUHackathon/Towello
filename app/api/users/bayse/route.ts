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

  const { bayseEmail, baysePassword, apiName } = await request.json();
  if (!bayseEmail.trim() || !baysePassword.trim() || !apiName.trim()) {
    return NextResponse.json(
      {
        error: "Invalid input data",
      },
      {
        status: 400,
      },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bayseEmail.trim())) {
    return NextResponse.json(
      {
        error: "Invalid email format",
      },
      {
        status: 400,
      },
    );
  }

  if (baysePassword.length < 6) {
    return NextResponse.json(
      {
        error: "Password must be at least 6 characters long",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ message: "Bayse linked successfully!" });
}
