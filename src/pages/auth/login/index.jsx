import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API}/auth/login`,
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", data.token);

      // login ke baad dashboard
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <h1
          className="mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%)",
          }}
        >
          Login
        </h1>
        <p className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>
          Welcome back! Please enter your details.
        </p>

        {error && (
          <div
            className="mb-6 rounded-xl border p-4"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              borderColor: "rgba(239, 68, 68, 0.3)",
            }}
          >
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ color: "#ef4444" }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
                {error}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
              style={{
                background: "var(--bg-primary)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
                "--tw-ring-color": "var(--brand)",
                "--tw-ring-opacity": "0.2",
              }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
              style={{
                background: "var(--bg-primary)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
                "--tw-ring-color": "var(--brand)",
                "--tw-ring-opacity": "0.2",
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--brand)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;