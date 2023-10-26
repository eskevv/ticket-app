import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const all_tickets_from_db = await Ticket.find();

    return NextResponse.json({ tickets: all_tickets_from_db }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;

    await Ticket.create(ticketData);

    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
