import matter from 'gray-matter';
import fs from 'fs/promises'
import type { Route } from "./+types/post";
import { ContentArticle } from '~/blog/components/ContentArticle';

export async function loader({ params }: Route.LoaderArgs) {

    try {
        const file = await fs.readFile(`posts/${params.postSlug}.md`, "utf-8")
        const { data, content } = matter(file);

        return {
            data,
            content
        }
    } catch {
        throw new Response("Not Found", { status: 404 });
    }


}

export function meta({ data }: Route.MetaArgs) {

    return [
        { title: `Security's Blog | ${data?.data?.title}`}
    ]
}

export default async function PostPage({
    loaderData
}: Route.ComponentProps) {


    return (
        <main className="container">
            <article className='main'>
                <h1
                    className="text-3xl font-bold mb-4"
                >
                    {loaderData.data.title}
                </h1>
                <ContentArticle content={loaderData.content} />
            </article>
        </main>
    )
}