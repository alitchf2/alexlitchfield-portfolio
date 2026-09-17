import { NavLink } from "react-router-dom";

export default function Navbar() {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-brand-gold font-bold border-b-2 border-brand-gold pb-1" : "text-brand-light font-medium hover:text-brand-gold transition-colors";

    return (
    <header className="sticky top-0 z-50 bg-brand-blue backdrop-blur-md border-b border-brand-ochre px-6 py-4">
      <nav className="max-w-5xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-brand-light hover:text-brand-gold">
          Alex Litchfield
        </NavLink>
        <div className="flex space-x-6">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/resume" className={linkClasses}>Resume</NavLink>
          <NavLink to="/projects" className={linkClasses}>Projects</NavLink>
          {/* <NavLink to="/apps" className={linkClasses}>Apps</NavLink> */}
        </div>
      </nav>
    </header>
  );
}
