import { getTranslations } from "next-intl/server";

type DemoNoticeProps = {
  className?: string;
};

export async function DemoNotice({ className = "" }: DemoNoticeProps) {
  const t = await getTranslations("Demo");

  return (
    <p
      className={`text-xs leading-relaxed text-ink/40 ${className}`}
      role="note"
    >
      {t("notice")}
    </p>
  );
}
