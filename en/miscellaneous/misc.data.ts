import { createContentLoader } from "vitepress";

export type Item = {
  title: string;
  url: string;
  description: string;
};

declare const data: Item[];
export { data };

export default createContentLoader(["en/miscellaneous/*.md"], {
  includeSrc: true,
  transform(rawData): Item[] {
    return rawData
      .filter((item) => !item.url.endsWith("/miscellaneous/"))
      .map((item) => ({
        title: item.frontmatter.title ?? item.src?.match(/^#\s+(.+)/m)?.[1].trim() ?? "",
        url: item.url.replace(/^\/en\//, "/"),
        description: item.frontmatter.description ?? "",
      }))
      .sort((a, b) => a.url.localeCompare(b.url));
  },
});
