import { NextResponse } from "next/server";

const allowedOrigins = ["https://santhosh-kumarr.vercel.app"];

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
    };
  }

  return {
    "Access-Control-Allow-Origin": "",
    Vary: "Origin",
  };
}

export function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");

  return NextResponse.json({ message: "Hello, world!" }, {
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json",
    },
  });
}

