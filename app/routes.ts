import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('./blog/layouts/BlogLayout.tsx', [
        index("routes/home.tsx"),
        route("/posts/:postSlug", "routes/post.tsx"),
        route("*", "./routes/404.tsx")
    ])
] satisfies RouteConfig;
