import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.type) {
      return NextResponse.json(
        { error: "Invalid request format." },
        { status: 400 }
      );
    }

    const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const textResponse = await response.text();
      return NextResponse.json({ message: textResponse }, { status: 200 });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Apps Script error: ${errorText}` },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
