import type { Route } from "./+types/home";
import { Form, Link, useSubmit } from "react-router";

import { getPosts } from "~/blog/services/posts";
import { useEffect } from "react";


export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') ?? ""

  const posts = await getPosts(query.toLowerCase());

  return {
    query,
    posts
  }
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Security's blog" },
    { name: "description", content: "Welcome to Security's blog!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { query } = loaderData;
  const posts = loaderData.posts as Array<{ title: string, slug: string }>
  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = query || "";
    }
  }, [query]);

  return (
    <>

      <main  className="container">
        <section className="header">
          {/** Header use tailwind */}
          <Form id="search-form" role="search"
            onChange={(event) => {
              submit(event.currentTarget)
            }}
            className="flex items-center justify-between p-4 "
          >
            <input
              aria-label="Search contacts"
              defaultValue={query || ""}
              id="query"
              name="query"
              placeholder="Search"
              type="search"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </Form>
        </section>
        <section className="sidebar">
          Sidebar
        </section>
        <section className="main">
          <ul className="list-none p-4">
            {
              posts.map((post) => (
                <li
                key={post.slug}>
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </li>
              ))
            }
          </ul>
        </section>
      </main>
    </>
  );
}
