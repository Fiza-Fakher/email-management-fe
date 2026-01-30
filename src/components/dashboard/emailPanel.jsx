import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddEmailModal from "../common/addEmailModal";
import axios from "axios";

export default function EmailsPanel() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [emails, setEmails] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // http://localhost:5000/api
  });

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/emails", { headers: authHeaders });
      setEmails(data); // backend: [{id, name, email, createdAt...}]
    } catch (err) {
      console.log(err);
      // optional: show error state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    return emails.filter((row) => {
      // backend me status/firstName/lastName nahi
      const matchTab = activeTab === "All" ? true : row.status === activeTab;

      const q = query.toLowerCase();
      const matchQuery =
        (row.email || "").toLowerCase().includes(q) ||
        (row.name || "").toLowerCase().includes(q);

      return matchTab && matchQuery;
    });
  }, [activeTab, query, emails]);

  // helper to split name for UI columns
  const splitName = (name = "") => {
    const parts = name.trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ");
    return { firstName, lastName };
  };

  const handleAddEmail = async ({ firstName, lastName, email }) => {
    try {
      const name = `${firstName} ${lastName}`.trim();

      const { data } = await api.post(
        "/emails",
        { name, email },
        { headers: { "Content-Type": "application/json" } } // add is public in backend
      );

      // add on top (or just refetch)
      setEmails((prev) => [data, ...prev]);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (row) => {
    try {
      await api.delete(`/emails/${row.id}`, { headers: authHeaders });
      setEmails((prev) => prev.filter((x) => x.id !== row.id));
    } catch (err) {
      console.log(err);
    }
  };

  const rowActions = [
    {
      label: "View",
      style: {
        borderColor: "var(--brand)",
        color: "var(--brand)",
        background: "var(--bg-secondary)",
      },
      onClick: (row) => navigate(`/detail/${row.id}`),
    },
    {
      label: "Delete",
      style: {
        borderColor: "var(--danger)",
        color: "var(--danger)",
        background: "var(--bg-secondary)",
      },
      onClick: handleDelete,
    },
  ];

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
            placeholder="Search name, email..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Total: {filtered.length} emails {loading ? "(loading...)" : ""}
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
              {filtered.map((row, idx) => {
                const { firstName, lastName } = splitName(row.name);
                const dateAdded = row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString("en-US")
                  : "-";

                return (
                  <tr
                    key={row.id}
                    className="border-t transition-all duration-200"
                    style={{
                      borderColor: "var(--border)",
                      background: idx % 2 === 0 ? "transparent" : "rgba(15,23,42,.015)",
                    }}
                  >
                    <td className="px-5 py-5" style={{ color: "var(--text-primary)" }}>
                      {firstName || "-"}
                    </td>

                    <td className="px-5 py-5" style={{ color: "var(--text-primary)" }}>
                      {lastName || "-"}
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
                      {dateAdded}
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
                );
              })}

              {!loading && filtered.length === 0 && (
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