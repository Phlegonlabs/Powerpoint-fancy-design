import fs from "node:fs/promises";

export const locales = [
  { id: "en", suffix: "", titleSuffix: "Preview" },
  { id: "zh-Hans", suffix: "-zh", titleSuffix: "中文预览" },
  { id: "zh-Hant", suffix: "-zh-tw", titleSuffix: "繁體中文預覽" },
];

export const localeFonts = {
  en: "",
  "zh-Hans": `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@400;700;900&display=swap" rel="stylesheet">`,
  "zh-Hant": `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">`,
};

const stylesUrl = new URL("./styles.json", import.meta.url);
const localizedUrl = new URL("./localized_copy.json", import.meta.url);

export const styles = JSON.parse(await fs.readFile(stylesUrl, "utf8"));
export const localizedCopy = JSON.parse(await fs.readFile(localizedUrl, "utf8"));
