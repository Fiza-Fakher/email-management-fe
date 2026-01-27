import React from "react";
import LoginForm from "../../../components/auth/LoginForm";

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border shadow-xl p-8"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img src="/navbarLogo.svg" alt="Logo" className="w-40 mb-4" />
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Welcome Back
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Please enter your details to sign in
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <div className="mt-6 text-center text-xs" style={{ color: "var(--text-secondary)" }}>
          ©Easezen Solutions. All rights reserved.
        </div>
      </div>
    </div>
  );
}
