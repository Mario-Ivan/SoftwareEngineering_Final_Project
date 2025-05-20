// components/navbar.tsx
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";

interface NavbarProps {
    message: string;
    buttonMessage: string;
}
const Navbar: React.FC<NavbarProps & { route: string }> = ({ message, buttonMessage, route }) => {
    // Simulate authentication state (replace with real auth logic)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>("");
    useEffect(() => {
        // Replace with real authentication/profile fetching logic
        const token = localStorage.getItem("jwt_auth");
        let user: any = null;
        if (token) {
            try {
                // Decode JWT payload (base64)
                user = JSON.parse(atob(token.split('.')[1]));
            } catch {
                user = null;
            }
        }
        console.log(user);
        if (user && user.name ) setUserName(user.name);
        console.log(user);
        if (user) {
            setIsLoggedIn(true);
            console.log("User authentication success");
            setProfilePic(user.profilePic || null);
        } else {
            console.log("User authentication false");
            setIsLoggedIn(false);
            setProfilePic(null);
        }
    }, []);

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
                {isLoggedIn ? (
                    <>
                        <span className="text-sm text-gray-600">Hi, {userName}</span>
                        <Link to="/profile">
                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">
                                    {userName ? userName.charAt(0).toUpperCase() : ""}
                                </div>
                            )}
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-sm text-gray-600">{message}</span>
                        <Link
                            to={route}
                            className="bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-md hover:bg-orange-200 transition"
                        >
                            {buttonMessage}
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
