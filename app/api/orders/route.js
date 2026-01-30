import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Shipping from "@/models/Shipping";

// GET /api/orders?userId=123
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("userId");
    console.log(email);

    if (!email) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const orders = await Shipping.find({ email }).sort({ createdAt: -1 }).lean();

    const formattedOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      createdAt: order.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedOrders);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch orders", error: err.message },
      { status: 500 }
    );
  }
}

