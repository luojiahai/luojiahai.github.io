import { createContentLoader } from "vitepress";

export type Post = {
  title: string;
  url: string;
  date: string;
  description: string;
};

declare const data: Post[];
export { data };

export default createContentLoader("en/posts/*.md", {
  includeSrc: true,
  transform(rawData): Post[] {
    return rawData
      .filter((item) => !item.url.endsWith("/posts/"))
      .map((item) => ({
        title: item.frontmatter.title ?? item.src?.match(/^#\s+(.+)/m)?.[1].trim() ?? "",
        url: item.url.replace(/^\/en\//, "/"),
        date: item.frontmatter.date ?? "",
        description: item.frontmatter.description ?? "",
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
});
