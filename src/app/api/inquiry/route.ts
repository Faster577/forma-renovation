import {
  type FieldErrorKeys,
  type InquiryInput,
  resolveInquiryLocale,
  validateInquiry,
} from "@/lib/inquiry";
import { sendInquiryEmail } from "@/lib/email";
import { getMessagesCatalog } from "@/lib/messages";

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, { status });
}

function mapErrors(
  errors: FieldErrorKeys,
  catalog: Record<string, string>,
): Record<string, string> {
  const mapped: Record<string, string> = {};
  for (const [field, code] of Object.entries(errors)) {
    mapped[field] = catalog[code] ?? catalog.form ?? code;
  }
  return mapped;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    const locale = resolveInquiryLocale(undefined);
    const messages = getMessagesCatalog(locale);
    return json(
      {
        ok: false,
        message: messages.InquiryErrors.invalidRequest,
        errors: { form: messages.InquiryErrors.invalidRequest },
      },
      400,
    );
  }

  if (!body || typeof body !== "object") {
    const locale = resolveInquiryLocale(undefined);
    const messages = getMessagesCatalog(locale);
    return json(
      {
        ok: false,
        message: messages.InquiryErrors.missingData,
        errors: { form: messages.InquiryErrors.missingData },
      },
      400,
    );
  }

  const input = body as InquiryInput;
  const locale = resolveInquiryLocale(input.locale);
  const messages = getMessagesCatalog(locale);
  const validation = validateInquiry({ ...input, locale });

  if (!validation.ok) {
    return json(
      {
        ok: false,
        message: messages.InquiryErrors.checkFields,
        errors: mapErrors(validation.errors, messages.InquiryErrors),
      },
      400,
    );
  }

  if (validation.isSpam) {
    return json({
      ok: true,
      mode: "ignored",
      message: messages.InquiryStatus.ignored,
    });
  }

  const result = await sendInquiryEmail(validation.data);

  if (result.status === "demo") {
    return json({
      ok: true,
      mode: "demo",
      message: messages.InquiryStatus.demo,
    });
  }

  if (result.status === "error") {
    return json(
      {
        ok: false,
        mode: "error",
        message: messages.InquiryStatus.error,
        errors: { form: result.message },
      },
      502,
    );
  }

  return json({
    ok: true,
    mode: "sent",
    message: messages.InquiryStatus.sent,
  });
}
