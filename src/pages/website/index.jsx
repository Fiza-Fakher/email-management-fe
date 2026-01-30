import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";

function Web() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API}/emails`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("User added successfully!");
      console.log("Created:", data);

      // Reset form after success
      setForm({ firstName: "", lastName: "", email: "" });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error:", err);
      setError(err?.response?.data?.message || "Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1
              className="bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%)",
              }}
            >
              Add New User
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              Fill in the details to add a new user to your system
            </p>
          </div>

          {/* Form Card */}
          <div
            className="rounded-2xl border p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            {/* Error Alert */}
            {error && (
              <div
                className="mb-6 rounded-xl border p-4 transition-all duration-300"
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

            {/* Success Alert */}
            {success && (
              <div
                className="mb-6 rounded-xl border p-4 transition-all duration-300"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  borderColor: "rgba(34, 197, 94, 0.3)",
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: "#22c55e" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-medium" style={{ color: "#22c55e" }}>
                    {success}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter first name"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    "--tw-ring-color": "var(--brand)",
                    "--tw-ring-opacity": "0.2",
                  }}
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter last name"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    "--tw-ring-color": "var(--brand)",
                    "--tw-ring-opacity": "0.2",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    "--tw-ring-color": "var(--brand)",
                    "--tw-ring-opacity": "0.2",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: "var(--brand)" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                    Adding User...
                  </span>
                ) : (
                  "Add User"
                )}
              </button>
            </form>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            Make sure all information is correct before submitting
          </p>
        </div>
      </div>
    </div>
  );
}

export default Web;