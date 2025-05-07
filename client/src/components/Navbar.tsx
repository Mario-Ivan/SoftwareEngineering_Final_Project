// components/navbar.tsx
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
    message: string;
    buttonMessage: string;
}

const Navbar: React.FC<NavbarProps & { route: string }> = ({ message, buttonMessage, route }) => {
    return (
        <nav className="flex items-center justify-between px-55 py-4 bg-white shadow-sm sticky top-0 z-50">
            <div className="flex items-center space-x-3">
                <GraduationCap className="text-orange-500" size={50} />
                <Link to='/' className="text-xl font-semibold text-gray-900">
                    E-Vision
                </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{message}</span>
                <Link
                    to={route}
                    className="bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-md hover:bg-orange-200 transition"
                >
                    {buttonMessage}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
