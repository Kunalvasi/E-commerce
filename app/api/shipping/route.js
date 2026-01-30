import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Shipping from "@/models/Shipping";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const requiredFields = [
      "fullName",
      "email",
      "address",
      "city",
      "state",
      "zip",
      "country",
      "phone",
      "products",
    ];

    for (const field of requiredFields) {
      if (!data[field] || (field === "products" && data.products.length === 0)) {
        return NextResponse.json(
          { message: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newShipping = new Shipping(data);
    await newShipping.save();

    return NextResponse.json({
      message: "Shipping info and products saved!",
      shipping: newShipping,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to save shipping info", error: err.message },
      { status: 500 }
    );
  }
}
