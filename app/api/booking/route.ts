import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const data = await req.json();
    
    const { fullName, email, phone, destination, travelDate, guests, message } = data;

    const newBooking = await Booking.create({
      name: fullName,
      email,
      phone,
      destination,
      travelDate: new Date(travelDate),
      people: String(guests),
      message
    });
    
    return NextResponse.json({
      success: true,
      message: "Booking saved successfully",
      data: newBooking
    }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating booking:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save booking. Please try again later.";
    return NextResponse.json({
      success: false,
      message: errorMessage
    }, { status: 400 });
  }
}
