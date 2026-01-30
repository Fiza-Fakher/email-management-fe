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
      const token = localStorage.getItem("token"); // agar login se token save kiya hua

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
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      setSuccess("User added successfully");
      console.log("Created:", data);

      setForm({ firstName: "", lastName: "", email: "" });
    } catch (err) {
      setError(err?.response?.data?.message || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto mt-12 px-4">
        <div
          className="rounded-xl border p-6"
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <h1 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
            Add User
          </h1>

          {error && <p className="mb-3 text-sm" style={{ color: "red" }}>{error}</p>}
          {success && <p className="mb-3 text-sm" style={{ color: "green" }}>{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-3 py-2 outline-none"
                style={{
                  background: "var(--bg-primary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-3 py-2 outline-none"
                style={{
                  background: "var(--bg-primary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-3 py-2 outline-none"
                style={{
                  background: "var(--bg-primary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg px-4 py-2 font-medium text-white disabled:opacity-60"
              style={{ background: "var(--brand)" }}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Web;