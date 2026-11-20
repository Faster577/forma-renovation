import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";

export const renovationTypeKeys = [
  "complete",
  "partial",
  "kitchen_bath",
  "other",
] as const;

export type RenovationTypeKey = (typeof renovationTypeKeys)[number];

export type InquiryInput = {
  renovationType: string;
  area: string;
  location: string;
  budget: string;
  startDate: string;
  description: string;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean | string;
  website?: string;
  locale?: string;
};

export type InquiryPayload = {
  renovationType: RenovationTypeKey;
  area: number;
  location: string;
  budget?: string;
  startDate?: string;
  description?: string;
  fullName: string;
  email: string;
  phone?: string;
  consent: true;
  locale: AppLocale;
};

export type InquiryErrorKey =
  | "renovationType"
  | "area"
  | "areaMax"
  | "location"
  | "fullName"
  | "email"
  | "phone"
  | "description"
  | "budget"
  | "startDate"
  | "consent"
  | "form";

export type FieldErrorKeys = Partial<Record<InquiryErrorKey, string>>;

export type InquiryValidationResult =
  | { ok: true; data: InquiryPayload; isSpam: boolean }
  | { ok: false; errors: FieldErrorKeys; isSpam: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asConsent(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1";
}

export function resolveInquiryLocale(value: unknown): AppLocale {
  const locale = asString(value);
  if (hasLocale(routing.locales, locale)) {
    return locale;
  }
  return routing.defaultLocale;
}

export function validateInquiry(raw: InquiryInput): InquiryValidationResult {
  const errors: FieldErrorKeys = {};
  const honeypot = asString(raw.website);
  const isSpam = honeypot.length > 0;
  const locale = resolveInquiryLocale(raw.locale);

  const renovationType = asString(raw.renovationType);
  const areaRaw = asString(raw.area).replace(",", ".");
  const location = asString(raw.location);
  const budget = asString(raw.budget);
  const startDate = asString(raw.startDate);
  const description = asString(raw.description);
  const fullName = asString(raw.fullName);
  const email = asString(raw.email).toLowerCase();
  const phone = asString(raw.phone);
  const consent = asConsent(raw.consent);

  if (!renovationTypeKeys.includes(renovationType as RenovationTypeKey)) {
    errors.renovationType = "renovationType";
  }

  const area = Number(areaRaw);
  if (!areaRaw || Number.isNaN(area) || area <= 0) {
    errors.area = "area";
  } else if (area > 2000) {
    errors.area = "areaMax";
  }

  if (location.length < 2) {
    errors.location = "location";
  }

  if (fullName.length < 2) {
    errors.fullName = "fullName";
  }

  if (!email || !EMAIL_RE.test(email)) {
    errors.email = "email";
  }

  if (phone && phone.length < 9) {
    errors.phone = "phone";
  }

  if (description.length > 4000) {
    errors.description = "description";
  }

  if (budget.length > 200) {
    errors.budget = "budget";
  }

  if (startDate.length > 200) {
    errors.startDate = "startDate";
  }

  if (!consent) {
    errors.consent = "consent";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, isSpam };
  }

  return {
    ok: true,
    isSpam,
    data: {
      renovationType: renovationType as RenovationTypeKey,
      area,
      location,
      budget: budget || undefined,
      startDate: startDate || undefined,
      description: description || undefined,
      fullName,
      email,
      phone: phone || undefined,
      consent: true,
      locale,
    },
  };
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.INQUIRY_TO_EMAIL?.trim() &&
      process.env.INQUIRY_FROM_EMAIL?.trim(),
  );
}
