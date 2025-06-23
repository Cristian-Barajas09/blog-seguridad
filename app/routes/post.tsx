import matter from 'gray-matter';
import fs from 'fs/promises'
import type { Route } from "./+types/post";
import { ContentArticle } from '~/blog/components/ContentArticle';
import { getPosts } from '~/blog/services/posts';

export async function loader({ params }: Route.LoaderArgs) {

    try {
        const file = await fs.readFile(`app/posts/${params.postSlug}.md`, "utf-8")
        const { data, content } = matter(file);
        let otherPosts = await getPosts(null);

        // Get a random post different from the current one
        // Filter out the current post
        const randomPosts = otherPosts.filter(post => post?.slug !== params.postSlug);

        // Shuffle and pick, for example, 3 random posts
        const shuffledPosts = randomPosts.sort(() => 0.5 - Math.random());
        const selectedPosts = shuffledPosts.slice(0, 3);

        return {
            data,
            content,
            selectedPosts
        }
    } catch {
        throw new Response("Not Found", { status: 404 });
    }


}

export function meta({ data }: Route.MetaArgs) {

    return [
        { title: `Security's Blog | ${data?.data?.title}` }
    ]
}

export default function PostPage({
    loaderData
}: Route.ComponentProps) {


    return (
        <main className="container">
            <section className="header flex items-center justify-center p-4">
                <h1
                    className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200"
                >
                    {loaderData.data.title}
                </h1>
            </section>
            <section className='main'>
                <article className='p-4'>
                    <ContentArticle content={loaderData.content} />
                </article>
            </section>
            <section className='sidebar'>
                {
                    loaderData.selectedPosts.map((post) => (
                        <div key={post!.slug} className="">
                            <h2 className="">
                                <a href={`/posts/${post!.slug}`}>{post!.title}</a>
                            </h2>
                        </div>
                    ))
                }
            </section>

        </main>
    )
}