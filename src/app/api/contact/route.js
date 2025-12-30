import { NextResponse } from "next/server";
import { sendMail } from "../../../lib/mailer";
import { contactEmailTemplate } from "../../../lib/templates/contactTemplate";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendMail({
      subject: `New Contact Message from ${name}`,
      html: contactEmailTemplate({
        name,
        email,
        phone,
        company,
        message,
      }),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Mail Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
