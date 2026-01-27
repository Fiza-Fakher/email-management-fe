import React, { useEffect, useState } from "react";

export default function AddEmailModal({ open, onClose, onAdd }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setEmail("");
    setStatus("Pending");
    setError("");
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const submit = (e) => {
    e.preventDefault();
    const v = email.trim().toLowerCase();

    if (!v) return setError("Email is required");
    if (!isValidEmail(v)) return setError("Enter a valid email");

    onAdd?.({ email: v, status });
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
      style={{ background: "rgba(15,23,42,.55)" }}
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border shadow-xl cursor-default"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-5 py-4 cursor-pointer"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <div className="text-lg font-bold">Add Email</div>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Add a new email to your list
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-3 py-1.5 text-sm font-semibold cursor-pointer"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submit} className="px-5 py-5">
          <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="e.g. user@example.com"
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
            autoFocus
          />

          <label
            className="mt-4 block text-xs font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <option value="Pending">Pending</option>
            <option value="Authorized">Authorized</option>
            <option value="Contacted">Contacted</option>
            <option value="Rejected">Rejected</option>
          </select>

          {error && (
            <div
              className="mt-3 rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "rgba(239,68,68,.35)",
                background: "rgba(239,68,68,.06)",
                color: "var(--danger)",
              }}
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-3 text-sm font-semibold cursor-pointer"
              style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-white cursor-pointer"
              style={{ background: "var(--brand)" }}
            >
              Save Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}