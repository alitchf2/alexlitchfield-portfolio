import { NavLink } from "react-router-dom";

export default function Navbar() {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-blue-500" : "text-white hover:text-blue-300";

    return (
        <nav className="flex justify-center space-x-4 p-4 bg-slate-800">
            <div className="flex space-x-4">
                <NavLink to="/" className={linkClasses}>
                    Home
                </NavLink>
                <NavLink to="/resume" className={linkClasses}>
                    Resume
                </NavLink>
                <NavLink to="/projects" className={linkClasses}>
                    Projects
                </NavLink>
                <NavLink to="/apps" className={linkClasses}>
                    Apps
                </NavLink>
            </div>
        </nav>
    );
}
