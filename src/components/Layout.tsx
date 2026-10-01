import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-light text-brand-navy">
            <ScrollRestoration />
            
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}