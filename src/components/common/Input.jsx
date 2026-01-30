import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    className = "",
    error,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={className}>
            {label && (
                <label
                    className="block text-xs font-semibold mb-2"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 pr-10"
                    style={{
                        background: "var(--bg-secondary)",
                        borderColor: "var(--border)",
                        "--tw-ring-color": "var(--brand)",
                    }}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        {showPassword ? (
                            <IoEyeOffOutline size={20} />
                        ) : (
                            <IoEyeOutline size={20} />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                    {error}
                </p>
            )}
        </div>
    );
}
