import { Link, Outlet } from "react-router";

export default function BlogLayout() {

    return (
        <>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
                <h1>Security's blog</h1>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                </ul>
            </header>

            <div className="flex items-center justify-center p-2">
                <Outlet />
            </div>
        </>
    );

}