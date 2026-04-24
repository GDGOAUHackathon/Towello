import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminAuth } from "./lib/firebase/admin";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const token = request.headers.get("authorization")?.split("Bearer ")[1] || "";
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await getAdminAuth()
    .verifyIdToken(token)
    .catch((err) => {
      console.error("Error verifying token:", err);
      return null;
    });

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized Access or Invalid Token" },
      { status: 401 },
    );
  }
  const requestHeaders = new Headers(request?.headers);
  requestHeaders.set("X-User-Id", user?.uid);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/api/:path*",
};
