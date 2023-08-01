import { getDependencies } from "@/dependencies";
import { NextResponse } from "next/server";

const { nftController } = getDependencies();

export async function POST(request: Request) {
  const req = await request.json();
  if (!req.body) {
    return NextResponse.json(
      {
        message: "Missing request body",
      },
      { status: 400 }
    );
  }
  await nftController.mintToken(req.body);
  return NextResponse.json({ message: "Token minted" });
}
