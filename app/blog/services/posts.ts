import matter from "gray-matter";
import { PostSchema } from "../schemas";

export async function getPosts(query: string | null) {
    const postFiles = import.meta.glob("../../../posts/*.md", { query: "?raw", import: 'default', eager: true })



    let posts = Object.entries(postFiles)
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
        .filter(Boolean);

    if (query !== null) {
        posts = posts.filter((post) => post?.title.toLowerCase().includes(query))
    }


    return posts
}