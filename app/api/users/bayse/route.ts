import { getAdminDb } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";
import { BayseRequest, BayseLoginResponse } from "./interface";
import { bayseApiBase } from "@/lib/config/server";

export async function GET(request: Request) {
  const db = getAdminDb();
  const authHeader = request.headers.get("authorization");
  const userId = request.headers.get("X-User-Id");
  if (!authHeader || !userId) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const userBayseRef = await db
      .collection("bayseCredentials")
      .doc(userId)
      .get();
    if (!userBayseRef.exists) {
      return NextResponse.json(
        {
          error: "No Bayse credentials found for this user.",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(
      {
        bayse: userBayseRef.data(),
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error("Error fetching Bayse credentials:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch credentials. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  const db = getAdminDb();
  const authHeader = request.headers.get("authorization");
  const userId = request.headers.get("X-User-Id");

  if (!authHeader || !userId) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  const { bayseEmail, baysePassword, apiName }: BayseRequest =
    await request.json();

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

  if (apiName.length < 3) {
    return NextResponse.json(
      {
        error: "API name must be at least 3 characters long",
      },
      {
        status: 400,
      },
    );
  }

  try {
    if ((await db.collection("bayseCredentials").doc(userId).get()).exists) {
      return NextResponse.json(
        {
          error: "Bayse is already linked to this account.",
        },
        {
          status: 409,
        },
      );
    }
    //  login in to the user account and save the credentials to the database
    const loginRequest = await fetch(`${bayseApiBase()}/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: bayseEmail,
        password: baysePassword,
      }),
    });

    const loginResponse: BayseLoginResponse = await loginRequest.json();
    if (!loginRequest.ok) {
      console.error("Error logging in to Bayse:", loginResponse);
      return NextResponse.json(
        {
          error:
            loginResponse?.message ||
            "Failed to log in to Bayse. Please check your credentials.",
          retryAfter: loginResponse?.retryAfter,
        },
        {
          status: 401,
        },
      );
    }

    const { token, deviceId } = loginResponse;

    const createApiKeyRequest = await fetch(
      `${bayseApiBase()}/v1/user/me/api-keys`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "x-device-id": deviceId,
        },
        body: JSON.stringify({
          name: apiName,
        }),
      },
    );

    const createApiKeyResponse = await createApiKeyRequest.json();
    if (!createApiKeyRequest.ok) {
      console.error("Error creating API key in Bayse:", createApiKeyResponse);
      return NextResponse.json(
        {
          error:
            createApiKeyResponse?.message ||
            "Failed to create API key in Bayse. Please try again.",
        },
        {
          status: 400,
        },
      );
    }

    await db.collection("bayseCredentials").doc(userId).set({
      publicKey: createApiKeyResponse.publicKey,
      secretKey: createApiKeyResponse.secretKey,
      createdAt: createApiKeyResponse.createdAt,
      name: apiName,
      deviceId: deviceId,
      id: createApiKeyResponse.id,
    });
    return NextResponse.json({ message: "Bayse linked successfully!" });
  } catch (err) {
    console.error("Error saving Bayse credentials:", err);
    return NextResponse.json(
      {
        error: "Failed to save credentials. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: Request) {
  const db = getAdminDb();
  const authHeader = request.headers.get("authorization");
  const userId = request.headers.get("X-User-Id");
  if (!authHeader || !userId) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }
  const userBayseRef = await db
    .collection("bayseCredentials")
    .doc(userId)
    .get();
  if (!userBayseRef.exists) {
    return NextResponse.json(
      {
        error: "No Bayse credentials found for this user.",
      },
      {
        status: 404,
      },
    );
  }
  const { bayseEmail, baysePassword } = await request.json();
  if (!bayseEmail.trim() || !baysePassword.trim()) {
    return NextResponse.json(
      {
        error: "All fields are required.",
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
  // login to the user bayse account and delete token
  try {
    const loginRequest = await fetch(`${bayseApiBase()}/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: bayseEmail,
        password: baysePassword,
      }),
    });
    const loginResponse: BayseLoginResponse = await loginRequest.json();
    console.log(loginResponse);
    if (!loginRequest.ok) {
      console.error("Error logging in to Bayse:", loginResponse);
      return NextResponse.json(
        {
          error:
            loginResponse?.message ||
            "Failed to log in to Bayse. Please check your credentials.",
          retryAfter: loginResponse?.retryAfter,
        },
        {
          status: 401,
        },
      );
    }
    const { token, deviceId } = loginResponse;

    const deleteApiKeyRequest = await fetch(
      `${bayseApiBase()}/v1/user/me/api-keys/${userBayseRef.data()?.id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
          "x-device-id": deviceId,
          "Content-Type": "application/json",
        },
      },
    );
    const deleteApiKeyResponse = await deleteApiKeyRequest.json();
    if (!deleteApiKeyRequest.ok) {
      console.error("Error deleting API key in Bayse:", deleteApiKeyResponse);
      return NextResponse.json(
        {
          error:
            `${deleteApiKeyResponse?.message}` ||
            "Failed to delete API key in Bayse. Please try again.",
          retryAfter: deleteApiKeyResponse?.retryAfter,
        },
        {
          status: 400,
        },
      );
    }

    await db.collection("bayseCredentials").doc(userId).delete();
    return NextResponse.json({
      message: "Bayse deleted successfully!",
    });
  } catch (err) {
    console.error("Error deleting Bayse credentials:", err);
    return NextResponse.json(
      {
        error: "Failed to delete credentials. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}
