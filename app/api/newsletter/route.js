import {connectDB} from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    await connectDB();

    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return new Response(
        JSON.stringify({ error: "Email already subscribed" }),
        { status: 409 }
      );
    }

    await Newsletter.create({ email });

    return new Response(
      JSON.stringify({ message: "Subscribed successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
