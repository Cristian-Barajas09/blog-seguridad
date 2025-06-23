import matter from "gray-matter";
import { PostSchema } from "../schemas";

const POST_FILES = import.meta.glob("../../posts/*.md", { query: "?raw", import: 'default', eager: true })


export async function getPosts(query: string | null) {

    let posts = Object.entries(POST_FILES)
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

export async function getPost(postSlug: string) {
    const filename = `${postSlug}.md`

    const key = Object.keys(POST_FILES).find(path => path.endsWith(filename));
    if (!key) throw new Response("Not Found", { status: 404 });

    const rawContent = POST_FILES[key] as string;
    const { data, content } = matter(rawContent);

    let otherPosts = await getPosts(null);
    const randomPosts = otherPosts.filter(post => post?.slug !== postSlug);
    const shuffledPosts = randomPosts.sort(() => 0.5 - Math.random());
    const selectedPosts = shuffledPosts.slice(0, 3);

    return {
        data,
        content,
        selectedPosts
    }
}