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
      <div className="mx-auto flex h-20  w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <img src="navbarLogo.svg" alt="" className="w-30" />
          {/* <div className="text-sm font-semibold">Email Management System</div> */}
        </div>

        <button
          onClick={() => navigate("/login")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="
            rounded-lg border border-2 px-4 flex justify-center items-center gap-2 py-3 text-sm font-semibold
            transition-all duration-300 ease-out
            hover:-translate-y-0.5 hover:shadow-lg
            active:translate-y-0 active:shadow-md
            cursor-pointer
          "
          style={{
            background: hover ? "var(--brand)" : "var(--bg-secondary)",
            borderColor: hover ? "var(--brand)" : "var(--border)",
            color: hover ? "#fff" : "var(--text-primary)",
          }}
        >
          Logout <IoIosLogOut size={20} />
        </button>
      </div>
    </div>
  );
}