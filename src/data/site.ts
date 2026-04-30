export const siteUrl = "https://dietrix.fit";
export const siteName = "Dietrix Nutrition";
export const nutritionistName = "Dn. Rimsha Naseer";
export const contactEmail = "hello@dietrixnutrition.com";

export const targetMarkets = [
  { country: "Pakistan", keywordLabel: "online nutritionist Pakistan" },
  { country: "United Kingdom", keywordLabel: "online nutritionist UK" },
  { country: "England", keywordLabel: "online diet plan England" },
  { country: "United States", keywordLabel: "online nutritionist USA" },
  { country: "Canada", keywordLabel: "online nutritionist Canada" },
  { country: "Germany", keywordLabel: "online nutritionist Germany" },
  { country: "France", keywordLabel: "online nutritionist France" },
  { country: "Saudi Arabia", keywordLabel: "online nutritionist KSA" },
  { country: "Dubai, UAE", keywordLabel: "online nutritionist Dubai" },
  { country: "Australia", keywordLabel: "online nutritionist Australia" },
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
