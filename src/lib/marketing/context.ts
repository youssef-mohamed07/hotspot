import type { Audience } from "@/i18n/audience";
import type { Locale } from "@/i18n/config";

export type MarketingContext = {
  locale?: Locale;
  audience?: Audience;
};

let marketingContext: MarketingContext = {};

export function setMarketingContext(context: MarketingContext) {
  marketingContext = context;
}

export function getMarketingContext(): MarketingContext {
  return marketingContext;
}
