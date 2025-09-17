

"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Database,
  ClipboardList,
  FileText,
  Calendar,
  Info,
} from "lucide-react";
import ChatPreview from "@/components/ChatPreview";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { JSX } from "react/jsx-dev-runtime";
import { Eye } from "lucide-react";

type ActionItem = {
  id: number;
  icon: JSX.Element;
  label: string;
  topic: string; // ✅ add topic field for filtering
};

const initialActions: ActionItem[] = [
  { id: 1, icon: <Search className="w-5 h-5 text-blue-500" />, label: "Identify Object by Name", topic: "Topic A" },
  { id: 2, icon: <Search className="w-5 h-5 text-blue-500" />, label: "Query Records (Beta)", topic: "Topic A" },
  { id: 3, icon: <Database className="w-5 h-5 text-pink-500" />, label: "Identify Record by Name", topic: "Topic B" },
  { id: 4, icon: <Database className="w-5 h-5 text-blue-500" />, label: "Query Records with Aggregate (Beta)", topic: "Topic C" },
  { id: 5, icon: <ClipboardList className="w-5 h-5 text-purple-500" />, label: "Summarize Record", topic: "Topic B" },
  { id: 6, icon: <Calendar className="w-5 h-5 text-blue-500" />, label: "Create Booking", topic: "Topic A" },
  { id: 7, icon: <Info className="w-5 h-5 text-blue-500" />, label: "Get Activity Details", topic: "Topic C" },
  { id: 8, icon: <FileText className="w-5 h-5 text-blue-500" />, label: "Get Record Details", topic: "Topic B" },
];

export default function ActionPage() {
  const [actions] = useState<ActionItem[]>(initialActions);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All"); // ✅ topic filter
  const router = useRouter();

  // ✅ Filter actions by topic + search
  const filtered = actions.filter(
    (a) =>
      (selectedTopic === "All" || a.topic === selectedTopic) &&
      a.label.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Extract unique topics for dropdown
  const topics = ["Select by Topics", ...new Set(actions.map((a) => a.topic))];

  return (
   <div className="h-screen flex flex-col overflow-hidden">
  {/* Top Header */}
  <Header agentName="Agent Builder" />

  <div className="flex flex-1 overflow-hidden">
    {/* Sidebar fixed width, no scrollbars */}
    <aside >
      <Sidebar />
    </aside>

    {/* Main Content Scrollable */}
    <main className="flex-1 bg-purple-50 p-6 overflow-y-auto no-scrollbar">
      {/* Header section */}
      <h2 className="mb-4 text-sm text-black font-semibold">
        To manage the actions assigned to your topic, you must deactivate your agent.
        <br />
        This is required to add or remove actions.
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold"></h1>
        <button
          onClick={() => router.push("/action/createaction")}
          className="px-3 py-1  bg-purple-700 text-white rounded-md hover:bg-purple-800 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Action
        </button>
      </div>
     

      {/* Search + Filter Row */}
      <div className="flex gap-3 mb-4">
        {/* Topic Dropdown */}
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-1/3 border rounded-md px-3 py-2"
        >
          {topics.map((topic, idx) => (
            <option key={idx} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search actions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2"
        />
      </div>

      {/* Action List */}
      <div className="border rounded-md bg-white divide-y">
        {filtered.length > 0 ? (
          filtered.map((action) => (
            <div
              key={action.id}
              className="flex justify-between items-center p-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                {action.icon}
                <span>{action.label}</span>
              </div>
              <button className="p-2 rounded hover:bg-gray-100">
                <Eye className="w-5 h-5 text-gray-600 hover:text-blue-600" />
              </button>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No actions available for this topic
          </div>
        )}
      </div>
    </main>

    {/* Right Chat Preview */}
    <aside className="hidden lg:block w-80 bg-white border-l overflow-y-auto">
      <ChatPreview />
    </aside>
  </div>
</div>

  );
}



