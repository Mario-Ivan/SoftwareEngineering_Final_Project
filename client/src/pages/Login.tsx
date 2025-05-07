import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
    };
    return (
        <>
            <Navbar message="Tidak punya akun?" buttonMessage="Daftar Akun" route='/signup'></Navbar>
            <div className="h-[calc(100vh-4rem)] overflow-hidden flex">
            {/* Left image side */}
                <img
                src="src/assets/Illustrations.png"
                alt="Login Illustration"
                className="max-w-full h-full object-cover"
                />

            {/* Right form side */}
            <div className="w-1/2 flex flex-col justify-center px-20">
                <h2 className="text-3xl font-semibold mb-8">Masuk ke akun Anda</h2>

                <form className="space-y-6" onSubmit={handleLogin}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Nama pengguna atau alamat email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showToggle={true}
                    onToggle={() => setShowPassword((prev) => !prev)}
                />

                <Button type="submit" onClick={() => handleLogin} text="Login" />
                </form>
            </div>
            </div>
        </>
        
    );
};

export default Login;