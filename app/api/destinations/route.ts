import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Destination from "@/models/Destination";

export async function GET() {
  try {
    await dbConnect();
    const destinations = await Destination.find({}).sort({ name: 1 });
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}
