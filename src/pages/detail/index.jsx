import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { INITIAL_EMAILS, badgeStyle } from "../../constant/index";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { FiClock } from "react-icons/fi";
import { MdOutlineNotes } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

const NOTES_KEY = "email_notes_v1";

const sourceById = (id) => (Number(id) % 2 === 0 ? "Automatic" : "Manual");
const lastUpdatedById = () => "Today";

function BackBar({ onBack }) {
  return (
    <div
      className="border-b shadow-md"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-6 flex items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-md font-semibold cursor-pointer hover:underline"
          style={{ color: "var(--brand)" }}
        >
          <IoArrowBack size={18} /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}

function StatItem({ icon, iconBg, iconColor, label, value, right }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <div
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </div>
        <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
      </div>

      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const emailRow = useMemo(
    () => INITIAL_EMAILS.find((e) => String(e.id) === String(id)),
    [id]
  );

  const [notes, setNotes] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    setNotes(all[id] ?? "");
    setEditing(false);
  }, [id]);

  const saveNotes = (value) => {
    setNotes(value);
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    all[id] = value;
    localStorage.setItem(NOTES_KEY, JSON.stringify(all));
  };

  if (!emailRow) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <BackBar onBack={() => navigate(-1)} />

        <div className="mx-auto max-w-5xl px-4 py-10">
          <div
            className="mx-auto w-full max-w-4xl rounded-3xl border p-10 shadow-sm"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div className="text-2xl font-bold">Email not found</div>
            <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              This record does not exist.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const source = sourceById(emailRow.id);
  const lastUpdated = lastUpdatedById();

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <BackBar onBack={() => navigate(-1)} />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div
          className="mx-auto w-full max-w-4xl rounded-3xl border shadow-sm"
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <div className="px-10 py-10">
            <div className="text-4xl font-bold tracking-tight text-slate-900">
              {emailRow.email}
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <StatItem
                icon={<HiOutlineCalendarDays size={22} />}
                iconBg="rgba(29,78,216,.10)"
                iconColor="var(--brand)"
                label="Created At"
                value={emailRow.dateAdded}
              />

              <StatItem
                icon={<BsInfoCircle size={20} />}
                iconBg="rgba(29,78,216,.10)"
                iconColor="var(--brand)"
                label="Status"
                value=""
                right={<span className={badgeStyle(emailRow.status)}>{emailRow.status}</span>}
              />

              <StatItem
                icon={<span className="text-base font-extrabold">i</span>}
                iconBg="rgba(22,163,74,.10)"
                iconColor="var(--success)"
                label="Source"
                value={source}
              />

              <StatItem
                icon={<FiClock size={20} />}
                iconBg="rgba(22,163,74,.10)"
                iconColor="var(--success)"
                label="Last Updated"
                value={lastUpdated}
              />
            </div>

            <div className="my-10 h-px w-full" style={{ background: "var(--border)" }} />

            <div className="flex items-center gap-3">
              <div className="text-[color:var(--brand)]">
                <MdOutlineNotes size={22} />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">Notes</div>
            </div>

            <div
              className="mt-5 rounded-2xl border"
              style={{ borderColor: "var(--border)", background: "rgba(15,23,42,.03)" }}
            >
              {editing ? (
                <textarea
                  value={notes}
                  onChange={(e) => saveNotes(e.target.value)}
                  rows={5}
                  className="w-full rounded-2xl bg-transparent px-5 py-4 text-sm outline-none"
                  placeholder="Write notes here..."
                />
              ) : (
                <div className="px-5 py-5 text-sm" style={{ color: "var(--text-primary)" }}>
                  {notes?.trim() ? (
                    notes
                  ) : (
                    <span style={{ color: "var(--text-secondary)" }}>
                      No notes yet. Click “Edit Notes” to add.
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="my-10 h-px w-full" style={{ background: "var(--border)" }} />

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setEditing((p) => !p)}
                className="rounded-xl px-6 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-[1px] hover:shadow-md cursor-pointer"
                style={{ background: "var(--brand)" }}
              >
                {editing ? "Done" : "Edit Notes"}
              </button>

              <button
                onClick={() => console.log("delete email", emailRow)}
                className="rounded-xl border px-6 py-4 text-sm font-semibold transition-all hover:-translate-y-[1px] hover:shadow-md hover:bg-[var(--danger)] hover:text-[var(--bg-primary)] cursor-pointer"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--danger)",
                  color: "var(--danger)",
                }}
              >
                Delete Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}