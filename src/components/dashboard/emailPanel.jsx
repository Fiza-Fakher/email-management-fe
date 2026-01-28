import React, { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddEmailModal from "../common/addEmailModal";
import { INITIAL_EMAILS } from "../../constant/index";

export default function EmailsPanel() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return emails.filter((row) => {
      const matchTab = activeTab === "All" ? true : row.status === activeTab;
      const q = query.toLowerCase();
      const matchQuery =
        row.email.toLowerCase().includes(q) ||
        (row.firstName || "").toLowerCase().includes(q) ||
        (row.lastName || "").toLowerCase().includes(q);

      return matchTab && matchQuery;
    });
  }, [activeTab, query, emails]);

  const rowActions = [
    {
      label: "View",
      style: {
        borderColor: "var(--brand)",
        color: "var(--brand)",
        background: "var(--bg-secondary)",
      },
      onClick: (row) => console.log("view", row),
    },
    {
      label: "Delete",
      style: {
        borderColor: "var(--danger)",
        color: "var(--danger)",
        background: "var(--bg-secondary)",
      },
      onClick: (row) => console.log("delete", row),
    },
  ];

  const handleAddEmail = ({ firstName, lastName, email, status }) => {
    if (emails.some((x) => x.email.toLowerCase() === email.toLowerCase())) return;

    const dateAdded = new Date().toLocaleDateString("en-US");
    setEmails((prev) => [
      { id: Date.now(), firstName, lastName, email, dateAdded, status },
      ...prev,
    ]);
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          className="flex w-full items-center gap-2 rounded-xl border px-4 py-4"
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <span className="text-slate-500">
            <IoSearchOutline size={22} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search first name, last name, email..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Total: {filtered.length} emails
        </div>
      </div>

      <div
        className="mt-6 overflow-hidden rounded-2xl border shadow-sm"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b"
                style={{ background: "rgba(15,23,42,.03)", borderColor: "var(--border)" }}
              >
                <th className="px-5 py-4 text-left text-xs font-bold tracking-wide uppercase">
                  First Name
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold tracking-wide uppercase">
                  Last Name
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold tracking-wide uppercase">
                  Email Address
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold tracking-wide uppercase">
                  Date Added
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold tracking-wide uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-t transition-all duration-200"
                  style={{
                    borderColor: "var(--border)",
                    background: idx % 2 === 0 ? "transparent" : "rgba(15,23,42,.015)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(29,78,216,.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      idx % 2 === 0 ? "transparent" : "rgba(15,23,42,.015)")
                  }
                >
                  <td className="px-5 py-5" style={{ color: "var(--text-primary)" }}>
                    {row.firstName || "-"}
                  </td>

                  <td className="px-5 py-5" style={{ color: "var(--text-primary)" }}>
                    {row.lastName || "-"}
                  </td>

                  <td className="px-5 py-5">
                    <button
                      onClick={() => navigate(`/detail/${row.id}`)}
                      className="font-semibold cursor-pointer"
                      style={{ color: "var(--brand)" }}
                    >
                      {row.email}
                    </button>
                  </td>

                  <td className="px-5 py-5" style={{ color: "var(--text-secondary)" }}>
                    {row.dateAdded}
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex flex-wrap gap-2">
                      {rowActions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => action.onClick(row)}
                          className="rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                          style={action.style}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    className="px-5 py-14 text-center"
                    colSpan={5}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    No results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddEmailModal open={open} onClose={() => setOpen(false)} onAdd={handleAddEmail} />
    </>
  );
}