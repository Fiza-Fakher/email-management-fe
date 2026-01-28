import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";

function Web() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log(form);

  setForm({
    firstName: "",
    lastName: "",
    email: "",
  });
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
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
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
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
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
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
              className="w-full rounded-lg px-4 py-2 font-medium text-white"
              style={{ background: "var(--brand)" }}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Web;