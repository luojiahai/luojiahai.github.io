import { createContentLoader } from "vitepress";

export type Post = {
  title: string;
  url: string;
  description: string;
  date: string;
};

declare const data: Post[];
export { data };

export default createContentLoader(["en/blog/*.md", "en/blog/*/*.md"], {
  includeSrc: true,
  transform(rawData): Post[] {
    return rawData
      .filter((item) => !item.url.endsWith("/blog/"))
      .map((item) => ({
        title: item.frontmatter.title ?? item.src?.match(/^#\s+(.+)/m)?.[1].trim() ?? "",
        url: item.url.replace(/^\/en\//, "/"),
        description: item.frontmatter.description ?? "",
        date: item.frontmatter.date ?? "",
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
  },
});
