import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="border-b shadow-sm"
      style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <img src="navbarLogo.svg" alt="" className="w-30" />
        </div>

        <button
          onClick={() => navigate("/login")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-300 ease-out hover:shadow-md active:scale-95"
          style={{
            background: hover ? "var(--brand)" : "var(--bg-primary)",
            borderColor: "var(--border)",
            color: hover ? "#fff" : "var(--text-primary)",
            border: hover ? "none" : "1px solid var(--border)",
          }}
        >
          Logout <IoIosLogOut size={20} />
        </button>
      </div>
    </div>
  );
}