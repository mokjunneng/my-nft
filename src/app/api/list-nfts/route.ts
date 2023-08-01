import { getDependencies } from "@/dependencies";
import { NextResponse } from "next/server";

const { nftController } = getDependencies();

export async function GET() {
  const res = await nftController.getAllTokens();
  return NextResponse.json(res);
}
