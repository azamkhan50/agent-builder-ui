"use client";


import ChatPreview from "@/components/ChatPreview";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import { Agent } from "@/lib/api";
import { useState } from "react";


export default function DataLibrary() {
const [agents, setAgents] = useState<Agent[]>([]);

  return (
    <div className="h-screen flex flex-col">
      <Header agentName="Agent Builder" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />


        {/* Main Content */}
        <main className="flex-1 bg-purple-50 p-6">
         <section className="max-w-6xl">
  {/* Header + Add Source */}
 <div className="border border-gray-400 rounded-md p-3 mb-4">
  {/* Top Header Row */}
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-bold">Data Library</h2>
    <div className="flex items-center space-x-2">
      <button
        title="Collapse"
        className="p-2 rounded hover:bg-gray-200"
        onClick={() => console.log("Collapse clicked")}
      >
        ⏪
      </button>
      <button
        title="Close"
        className="p-2 rounded hover:bg-gray-200"
        onClick={() => console.log("Close clicked")}
      >
        ❌
      </button>
    </div>
  </div>
</div>

{/* Manage Sources + Add Button */}
<div className="flex items-center justify-between mb-4">
  <p className="text-gray-700">
    Manage the data sources assigned to your agent.
  </p>
  <button className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition">
    <span className="text-lg">＋</span> Add Source
  </button>
</div>

  {/* Search + Refresh */}
  <div className="flex items-center gap-2 mb-3">
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Search data sources..."
        className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>
    <button className="p-2 rounded-md hover:bg-gray-200 transition">
      🔄
    </button>
  </div>

  {/* Meta Info */}
  <p className="text-sm text-gray-500 mb-2">
    3 items • Sorted by Name (asc)
  </p>

  {/* Table */}
  <div className="bg-white  shadow-sm overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-purple-100 text-gray-700">
          <th className="px-4 py-2 text-left font-medium">Name ⌄</th>
          <th className="px-4 py-2 text-left font-medium">Type ⌄</th>
          <th className="px-4 py-2 text-left font-medium">Last Updated ⌄</th>
          <th className="px-4 py-2 text-left font-medium">Actions ⌄</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr className="hover:bg-gray-50">
          <td className="px-4 py-3">Data Source 1</td>
          <td className="px-4 py-3">Type 1</td>
          <td className="px-4 py-3">Updated 1 day ago</td>
          <td className="px-4 py-3 text-center">⋮</td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="px-4 py-3">Data Source 2</td>
          <td className="px-4 py-3">Type 2</td>
          <td className="px-4 py-3">Updated 2 days ago</td>
          <td className="px-4 py-3 text-center">⋮</td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="px-4 py-3">Data Source 3</td>
          <td className="px-4 py-3">Type 3</td>
          <td className="px-4 py-3">Updated 3 days ago</td>
          <td className="px-4 py-3 text-center">⋮</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>





        </main>

        {/* Right Preview */}
        <ChatPreview />

      </div>
    </div>
  );
}
