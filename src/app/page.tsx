import { redirect } from "next/navigation";
import { defaultAudience } from "@/i18n/audience";
import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  redirect(`/${defaultLocale}/${defaultAudience}`);
}
