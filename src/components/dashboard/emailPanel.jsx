import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddEmailModal from "../common/addEmailModal";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function EmailsPanel() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [emails, setEmails] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
  });

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/emails", { headers: authHeaders });
      setEmails(data);
    } catch (err) {
      console.log(err);
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
      const matchTab = activeTab === "All" ? true : row.status === activeTab;

      const q = query.toLowerCase();
      const matchQuery =
        (row.email || "").toLowerCase().includes(q) ||
        (row.name || "").toLowerCase().includes(q);

      return matchTab && matchQuery;
    });
  }, [activeTab, query, emails]);

  const handleAddEmail = async ({ firstName, lastName, email }) => {
    try {
      const name = `${firstName} ${lastName}`.trim();

      const { data } = await api.post(
        "/emails",
        { name, email },
        { headers: { "Content-Type": "application/json" } }
      );

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
      label: <FaRegEdit size={20} />,
      style: {
        color: "var(--brand)",
        background: "var(--bg-secondary)",
      },
      onClick: (row) => navigate(`/detail/${row.id}`),
    },
    {
      label: <MdDelete size={22} />,
      style: {
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
          className="group flex w-full items-center gap-3 rounded-2xl border px-5 py-4 shadow-sm transition-all duration-300 hover:shadow-md focus-within:shadow-lg focus-within:ring-2"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border)",
            "--tw-ring-color": "var(--brand)",
            "--tw-ring-opacity": "0.15",
          }}
        >
          <span className="transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
            <IoSearchOutline size={24} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-sm"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Total: <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{filtered.length}</span> emails {loading ? "(loading...)" : ""}
        </div>
      </div>

      <div
        className="mt-6 overflow-hidden rounded-2xl border shadow-md transition-shadow duration-300 hover:shadow-lg"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b"
                style={{
                  background: "linear-gradient(to bottom, rgba(15,23,42,.04), rgba(15,23,42,.02))",
                  borderColor: "var(--border)",
                }}
              >
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                  Name
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                  Email Address
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                  Created At
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, idx) => {
                const dateAdded = row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString("en-US")
                  : "-";

                return (
                  <tr
                    key={row.id}
                    className="border-t transition-all duration-200 hover:bg-opacity-50"
                    style={{
                      borderColor: "var(--border)",
                      background: idx % 2 === 0 ? "transparent" : "rgba(15,23,42,.015)",
                    }}
                  >
                    <td className="px-6 py-5 font-medium" style={{ color: "var(--text-primary)" }}>
                      {row.name || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => navigate(`/detail/${row.id}`)}
                        className="cursor-pointer font-semibold transition-all duration-200 hover:underline hover:opacity-80"
                        style={{ color: "var(--brand)" }}
                      >
                        {row.email}
                      </button>
                    </td>

                    <td className="px-6 py-5 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {dateAdded}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {rowActions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => action.onClick(row)}
                            className="rounded-xl px-4 py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
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
                    className="px-6 py-16 text-center"
                    colSpan={4}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <IoSearchOutline size={48} opacity={0.3} />
                      <p className="text-base font-medium">No results found</p>
                    </div>
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