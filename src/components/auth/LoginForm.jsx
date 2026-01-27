import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (email === "easezensolution@gmail.com" && password === "Ease@123") {
            navigate("/");
        } else {
            setError("Incorrect email or password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                }}
                placeholder="Enter your email"
                required
            />

            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                }}
                placeholder="Enter your password"
                required
            />

            {error && (
                <div
                    className="rounded-xl px-4 py-3 text-sm text-center font-medium"
                    style={{
                        background: "rgba(239,68,68,0.1)",
                        color: "var(--danger)",
                    }}
                >
                    {error}
                </div>
            )}

            <Button type="submit">Sign In</Button>
        </form>
    );
}
