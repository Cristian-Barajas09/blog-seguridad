import { Link, Outlet } from "react-router";

export default function BlogLayout() {

    return (
        <>
            <header>
                <h1>Security's blog</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );

}