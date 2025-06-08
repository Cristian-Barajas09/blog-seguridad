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

      <section>
        {/** Header */}
        <Form id="search-form" role="search"
          onChange={(event) =>{
            submit(event.currentTarget)
          }}
        >
          <input
            aria-label="Search contacts"
            defaultValue={query || ""}
            id="query"
            name="query"
            placeholder="Search"
            type="search"
          />
        </Form>
      </section>
      <section>
        <ul>
          {
            posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/posts/${post.slug}`}>{post.title}</Link>
              </li>
            ))
          }
        </ul>
      </section>
    </>
  );
}
