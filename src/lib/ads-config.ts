import raw from "../../public/ads.json";

export type AdsConfig = Record<string, string>;

export const ADS_CONFIG: AdsConfig = raw;

export function isBannerUnit(path: string): boolean {
  return path.startsWith("/ads/units/");
}
