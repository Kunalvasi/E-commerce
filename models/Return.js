// models/Return.js
import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending, Approved, Rejected
  },
  { timestamps: true }
);

export default mongoose.models.Return || mongoose.model("Return", ReturnSchema);
