import { getAdminAuth } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (!req.headers.get("authorization") || !req.headers.get("X-User-Id")) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      { status: 401 },
    );
  }
  const cookieStore: string =
    req.headers.get("authorization")?.split("Bearer ")[1] || "";

  try {
    const user = await getAdminAuth().verifyIdToken(cookieStore);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.name,
    };
    return NextResponse.json({ message: "Hello, World!", user: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        error: "Unable to fetch user data",
      },
      {
        status: 500,
      },
    );
  }
}
