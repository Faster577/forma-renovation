"use client";

import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/inquiry/form-field";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import {
  type FieldErrorKeys,
  type InquiryInput,
  renovationTypeKeys,
  validateInquiry,
} from "@/lib/inquiry";
import { LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";

type InquiryFormProps = {
  demoMode: boolean;
};

type SubmitMode = "sent" | "demo" | "ignored" | "error";

type FormState = {
  renovationType: string;
  area: string;
  location: string;
  budget: string;
  startDate: string;
  description: string;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
  website: string;
};

const initialState: FormState = {
  renovationType: "",
  area: "",
  location: "",
  budget: "",
  startDate: "",
  description: "",
  fullName: "",
  email: "",
  phone: "",
  consent: false,
  website: "",
};

export function InquiryForm({ demoMode }: InquiryFormProps) {
  const formId = useId();
  const locale = useLocale();
  const t = useTranslations("InquiryForm");
  const tErrors = useTranslations("InquiryErrors");
  const tPage = useTranslations("InquiryPage");
  const tCommon = useTranslations("Common");
  const optionalLabel = tCommon("optional");

  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{
    mode: SubmitMode;
    message: string;
  } | null>(null);

  function mapErrorKeys(keys: FieldErrorKeys): Record<string, string> {
    const mapped: Record<string, string> = {};
    for (const [field, code] of Object.entries(keys)) {
      mapped[field] = tErrors(code as Parameters<typeof tErrors>[0]);
    }
    return mapped;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setStatus(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const payload: InquiryInput = {
      renovationType: values.renovationType,
      area: values.area,
      location: values.location,
      budget: values.budget,
      startDate: values.startDate,
      description: values.description,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      consent: values.consent,
      website: values.website,
      locale,
    };

    const clientValidation = validateInquiry(payload);
    if (!clientValidation.ok) {
      setErrors(mapErrorKeys(clientValidation.errors));
      return;
    }

    setPending(true);
    setErrors({});

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        mode?: SubmitMode;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? { form: data.message ?? tErrors("submitFailed") });
        setStatus({
          mode: "error",
          message: data.message ?? tErrors("submitFailed"),
        });
        return;
      }

      const mode = data.mode ?? (demoMode ? "demo" : "sent");
      setStatus({
        mode,
        message: data.message ?? "",
      });

      // Keep form values in demo/ignored modes so the visitor can see what was tested.
      if (mode === "sent") {
        setValues(initialState);
      }
    } catch {
      setStatus({
        mode: "error",
        message: tErrors("networkError"),
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <FadeIn>
      <form
        onSubmit={onSubmit}
        noValidate
        className="relative space-y-8 border border-ink/10 bg-paper/60 p-6 sm:p-8 md:p-10"
        aria-describedby={status ? `${formId}-status` : undefined}
      >
        {demoMode ? (
          <div
            className="border border-accent/25 bg-ivory px-4 py-3 text-sm leading-relaxed text-ink/65"
            role="status"
          >
            {tPage("demoBanner")}
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <SelectField
            id={`${formId}-type`}
            label={t("renovationType")}
            required
            value={values.renovationType}
            error={errors.renovationType}
            onChange={(event) => update("renovationType", event.target.value)}
            disabled={pending}
          >
            <option value="">{t("renovationTypePlaceholder")}</option>
            {renovationTypeKeys.map((type) => (
              <option key={type} value={type}>
                {t(`types.${type}`)}
              </option>
            ))}
          </SelectField>

          <TextField
            id={`${formId}-area`}
            label={t("area")}
            required
            inputMode="decimal"
            placeholder={t("areaPlaceholder")}
            value={values.area}
            error={errors.area}
            onChange={(event) => update("area", event.target.value)}
            disabled={pending}
          />
        </div>

        <TextField
          id={`${formId}-location`}
          label={t("location")}
          required
          placeholder={t("locationPlaceholder")}
          value={values.location}
          error={errors.location}
          onChange={(event) => update("location", event.target.value)}
          disabled={pending}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id={`${formId}-budget`}
            label={t("budget")}
            optionalLabel={optionalLabel}
            placeholder={t("budgetPlaceholder")}
            value={values.budget}
            error={errors.budget}
            onChange={(event) => update("budget", event.target.value)}
            disabled={pending}
          />
          <TextField
            id={`${formId}-start`}
            label={t("startDate")}
            optionalLabel={optionalLabel}
            placeholder={t("startDatePlaceholder")}
            value={values.startDate}
            error={errors.startDate}
            onChange={(event) => update("startDate", event.target.value)}
            disabled={pending}
          />
        </div>

        <TextAreaField
          id={`${formId}-description`}
          label={t("description")}
          optionalLabel={optionalLabel}
          placeholder={t("descriptionPlaceholder")}
          value={values.description}
          error={errors.description}
          onChange={(event) => update("description", event.target.value)}
          disabled={pending}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id={`${formId}-name`}
            label={t("fullName")}
            required
            autoComplete="name"
            value={values.fullName}
            error={errors.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            disabled={pending}
          />
          <TextField
            id={`${formId}-email`}
            label={t("email")}
            required
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            error={errors.email}
            onChange={(event) => update("email", event.target.value)}
            disabled={pending}
          />
        </div>

        <TextField
          id={`${formId}-phone`}
          label={t("phone")}
          optionalLabel={optionalLabel}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={t("phonePlaceholder")}
          value={values.phone}
          error={errors.phone}
          onChange={(event) => update("phone", event.target.value)}
          disabled={pending}
        />

        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        >
          <label htmlFor={`${formId}-website`}>{t("honeypot")}</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
            <input
              id={`${formId}-consent`}
              type="checkbox"
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
              disabled={pending}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={
                errors.consent
                  ? `${formId}-consent-error`
                  : `${formId}-consent-hint`
              }
              className="mt-1 h-4 w-4 rounded-sm border-ink/30 accent-ink"
            />
            <span>
              {t("consent")}{" "}
              <span className="text-accent" aria-hidden>
                *
              </span>
            </span>
          </label>
          <p id={`${formId}-consent-hint`} className="sr-only">
            {t("consentHint")}
          </p>
          {errors.consent ? (
            <p
              id={`${formId}-consent-error`}
              role="alert"
              className="text-sm text-red-800/80"
            >
              {errors.consent}
            </p>
          ) : null}
        </div>

        {errors.form ? (
          <p role="alert" className="text-sm text-red-800/80">
            {errors.form}
          </p>
        ) : null}

        {status ? (
          <div
            id={`${formId}-status`}
            role="status"
            aria-live="polite"
            className={`border px-4 py-3 text-sm leading-relaxed ${
              status.mode === "error"
                ? "border-red-900/20 bg-red-950/[0.04] text-red-900/80"
                : status.mode === "demo" || status.mode === "ignored"
                  ? "border-accent/25 bg-ivory text-ink/70"
                  : "border-ink/15 bg-ivory text-ink/70"
            }`}
          >
            {status.message}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink/40">{t("requiredNote")}</p>
          <Button type="submit" disabled={pending} className="min-w-44">
            {pending ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </div>
      </form>
    </FadeIn>
  );
}
