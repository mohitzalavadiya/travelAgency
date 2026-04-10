import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export async function GET() {
  try {
    await dbConnect();
    const teamMembers = await Team.find({}).sort({ createdAt: -1 });
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Failed to fetch team:", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}
