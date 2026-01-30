import React from "react";
import Navbar from "../../components/common/Navbar"
import EmailsPanel from "../../components/dashboard/emailPanel";

export default function Dashboard() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar/>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <h1 
          className="bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%)",
          }}
        >
          Email Dashboard
        </h1>

        <EmailsPanel />
      </div>
    </div>
  );
}