import React from "react";

export default function Button({
    children,
    onClick,
    type = "button",
    className = "",
    style = {},
    variant = "primary", // primary | danger | outline
    ...props
}) {

    const baseStyles = {
        background: variant === "primary" ? "var(--brand)" :
            variant === "danger" ? "var(--danger)" : "transparent",
        color: variant === "outline" ? "var(--text-primary)" : "#fff",
        border: variant === "outline" ? "1px solid var(--border)" : "none",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${className}`}
            style={{ ...baseStyles, ...style }}
            {...props}
        >
            {children}
        </button>
    );
}
