import { NextRequest, NextResponse } from "next/server";
import clientPromise, { DB_NAME, COLLECTION_NAME } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "qna" or "pendapat"
    
    // Connect to database
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Fetch matching data, sort by descending timestamp (newest first)
    const messages = await collection
      .find(type ? { type } : {})
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json({
      status: "success",
      // Remove raw MongoDB _id for easier client consumption
      data: messages.map(msg => ({
        id: msg._id.toString(),
        timestamp: msg.timestamp,
        name: msg.name,
        message: msg.message,
        type: msg.type,
        answer: msg.answer ?? null   // field balasan Ray (opsional)
      }))
    });

  } catch(e: any) {
    console.error("GET messages error:", e);
    return NextResponse.json({ status: "error", message: "Database read failed", details: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = body.type; // "qna" | "pendapat"
    const name = body.name || "Anonim";
    const message = body.message;

    if (!message || !type) {
      return NextResponse.json({ status: "error", message: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const doc = {
      type,
      name,
      message,
      timestamp: new Date().toISOString()
    };

    const result = await collection.insertOne(doc);

    if (result.acknowledged) {
      return NextResponse.json({ status: "success" });
    } else {
      throw new Error("Insert not acknowledged");
    }

  } catch (err: any) {
    console.error("POST message error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
