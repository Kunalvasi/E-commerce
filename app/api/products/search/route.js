import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb"; // your DB connection
import Product from "@/models/Product"; // your mongoose model

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const products = await Product.find({
    title: { $regex: query, $options: "i" }, // case-insensitive search
  });

  return NextResponse.json(products);
}
