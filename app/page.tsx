"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/Home" className="hover:text-gray-300">🏠 Home</Link>
        <Link href="/Dashboard" className="hover:text-gray-300">📊 Dashboard</Link>
      </nav>
    </aside>
  );
}
