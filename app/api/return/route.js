// app/api/returns/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ReturnRequest from "@/models/Return";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Validate required fields
    const requiredFields = ["orderId", "email", "reason"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newReturn = new ReturnRequest(data);
    await newReturn.save();

    return NextResponse.json({
      message: "Return request submitted successfully!",
      returnRequest: newReturn,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to submit return request", error: err.message },
      { status: 500 }
    );
  }
}
