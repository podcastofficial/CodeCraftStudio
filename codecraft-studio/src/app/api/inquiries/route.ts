import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { getSql } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/telegram";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form fields and try again." },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const data = parsed.data;
    const sql = getSql();

    const rows = await sql`
      INSERT INTO inquiries (
        name,
        telegram_username,
        project_type,
        budget,
        message
      )
      VALUES (
        ${data.name},
        ${data.telegram_username || null},
        ${data.project_type},
        ${data.budget || null},
        ${data.message}
      )
      RETURNING id, name, telegram_username, project_type, budget, message, created_at
    `;

    const inquiry = rows[0] as Record<string, unknown>;

    const messageText = [
      "🚀 New CodeCraft Studio Inquiry",
      `Inquiry: #${inquiry.id}`,
      `Name: ${inquiry.name}`,
      `Telegram: ${inquiry.telegram_username || "Not provided"}`,
      `Project: ${inquiry.project_type}`,
      `Budget: ${inquiry.budget || "Not specified"}`,
      "",
      "Message:",
      String(inquiry.message).slice(0, 2500)
    ].join("\n");

    let notification: { sent: boolean; reason?: string } = {
      sent: false,
      reason: "Notification not attempted."
    };

    try {
      notification = await sendInquiryNotification(messageText);
    } catch (error) {
      notification = {
        sent: false,
        reason: error instanceof Error
          ? error.message
          : "Notification failed."
      };
    }

    try {
      await sql`
        INSERT INTO notification_logs (
          inquiry_id,
          channel,
          status,
          error_message
        )
        VALUES (
          ${Number(inquiry.id)},
          'telegram',
          ${notification.sent ? "sent" : "failed"},
          ${notification.sent
            ? null
            : (notification.reason || "Notification failed.").slice(0, 500)}
        )
      `;
    } catch {
      // Inquiry is already saved. Do not fail the client response.
    }

    return NextResponse.json({
      ok: true,
      id: inquiry.id,
      notificationSent: notification.sent
    });
  } catch (error) {
    console.error("Inquiry submission failed:", error);

    return NextResponse.json(
      {
        error: "We could not save your inquiry right now. Please try again later or contact us on Telegram."
      },
      { status: 500 }
    );
  }
}
