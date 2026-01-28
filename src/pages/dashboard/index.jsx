import React from "react";
import Navbar from "../../components/common/Navbar"
import EmailsPanel from "../../components/dashboard/emailPanel";

export default function Dashboard() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar/>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <h1 className="text-4xl font-bold ">Email Dashboard</h1>

        
        <EmailsPanel />
      </div>
    </div>
  );
}