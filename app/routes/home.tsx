import type { Route } from "./+types/home";
import { z } from 'zod';
import { Welcome } from "../welcome/welcome";
import matter from "gray-matter";
import { Link } from "react-router";
import { PostSchema } from "~/blog/schemas";


export async function loader() {
  

  const postFiles = import.meta.glob("../../posts/*.md", { as: "raw", eager: true })

  const posts = Object.entries(postFiles)
    .map(([path, rawContent]) => {
      const { data } = matter(rawContent as string);

      const parsed = PostSchema.safeParse(data);
      if (!parsed.success) return null;
      const filename = path.split("/").pop()!;
      const slug = filename.replace(/\.md$/, "");
      return {
        slug,
        ...parsed.data,
      };

    })
    .filter(Boolean)


  return {
    posts
  }
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Security's blog" },
    { name: "description", content: "Welcome to Security's blog!" },
  ];
}

export default async function Home({ loaderData }: Route.ComponentProps) {
  
  const posts = loaderData.posts as Array<{ title: string, slug: string }>
  
  return (
    <>
      <ul>
        {
          posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}
