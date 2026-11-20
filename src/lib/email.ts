import type { InquiryPayload } from "@/lib/inquiry";
import { isEmailConfigured } from "@/lib/inquiry";
import { getMessagesCatalog } from "@/lib/messages";
import { Resend } from "resend";

export type SendInquiryResult =
  | { status: "sent"; id: string }
  | { status: "demo" }
  | { status: "error"; message: string };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailContent(input: {
  typeLabel: string;
  data: InquiryPayload;
}): { subject: string; html: string; text: string } {
  const { typeLabel, data } = input;
  const subject = `FORMA. inquiry — ${typeLabel} (${data.location})`;

  const rows: Array<[string, string]> = [
    ["Locale", data.locale],
    ["Renovation type", typeLabel],
    ["Floor area", `${data.area} m²`],
    ["Location", data.location],
    ["Budget", data.budget ?? "—"],
    ["Start date", data.startDate ?? "—"],
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone ?? "—"],
    ["Description", data.description ?? "—"],
  ];

  const text = [
    "New inquiry from FORMA. website",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const html = `
    <div style="font-family: Georgia, serif; color: #1c1a17; line-height: 1.5;">
      <h1 style="font-size: 20px; font-weight: 500;">New inquiry from FORMA.</h1>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e1d6; width: 38%; color: #6f6558; font-size: 13px;">${escapeHtml(label)}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e1d6; font-size: 14px;">${escapeHtml(value).replaceAll("\n", "<br />")}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  return { subject, html, text };
}

export async function sendInquiryEmail(
  data: InquiryPayload,
): Promise<SendInquiryResult> {
  if (!isEmailConfigured()) {
    return { status: "demo" };
  }

  const apiKey = process.env.RESEND_API_KEY!.trim();
  const to = process.env.INQUIRY_TO_EMAIL!.trim();
  const from = process.env.INQUIRY_FROM_EMAIL!.trim();
  const typeLabel =
    getMessagesCatalog(data.locale).InquiryForm.types[data.renovationType] ??
    data.renovationType;
  const { subject, html, text } = buildEmailContent({ typeLabel, data });

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      return {
        status: "error",
        message: result.error.message || "Email sending failed.",
      };
    }

    return { status: "sent", id: result.data?.id ?? "unknown" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected email error.";
    return { status: "error", message };
  }
}
