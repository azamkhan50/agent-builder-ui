"use client";

import ChatPreview from "@/components/ChatPreview";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import { Agent } from "@/lib/api";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function ConnectionsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  return (
    <div className="h-screen flex flex-col">
      <Header agentName="Agent Builder" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar  />

        {/* Main Content */}
        <main className="flex-1 bg-purple-50 p-6 overflow-y-auto">
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Connections</h1>
            <button
              className="p-2 hover:bg-gray-200 rounded-md"
              onClick={() => console.log("Close clicked")}
            >
              ✖
            </button>
          </div>

          {/* Inbound Omni-Channel Flows */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Inbound Omni-Channel Flows</h2>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
              Go to Flow Builder
            </button>
          </div>
          <div className="border rounded-md p-3 text-gray-600 mb-6">
            You haven't added any Omni-Channel flows for your agent. Manage flows for this agent in Flow Builder.
          </div>

          {/* Outbound Omni-Channel Flow */}
          <h2 className="text-lg font-semibold mb-2">Outbound Omni-Channel Flow</h2>
          <div className="border rounded-md p-3 text-gray-600 mb-6">
            Specify the default flow the agent uses to route conversations to an agent. The routing destination is determined by the rules defined in the flow.
          </div>

          {/* Choose a Flow */}
          <EditableRow title="Choose a Flow" value="ESA - Route to Queue" />

          {/* Escalation Message */}
          <EditableRow
            title="Escalation Message"
            value="One moment while I connect you to the next available service representative."
          />

          {/* Connections */}
          <h2 className="text-lg font-semibold mt-6 mb-2">Connections</h2>
          <div className="border rounded-md p-3 text-gray-600 mb-4">
            You haven't added any connection deployments for your agent.
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition">
              Add
            </button>
          </div>
        </main>

        {/* Right Preview */}
        <ChatPreview />
      </div>
    </div>
  );
}

function EditableRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between items-start border-b border-gray-200 py-3">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-700 mt-1">{value}</p>
      </div>
      <button
        className="p-2 hover:bg-gray-200 rounded-md"
        onClick={() => console.log(`Edit ${title}`)}
      >
        <Pencil className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
