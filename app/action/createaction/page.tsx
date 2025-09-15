"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function ActionModalPage() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Page Header */}
      <Header agentName="Agent Builder" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
        <h2 className="text-lg font-semibold mb-4">Create an Agent Action</h2>

        <p className="text-sm text-gray-600 mb-4">
          Actions are how an agent gets things done. To create an agent action,
          start with the functionality you already have in Salesforce, such as flows or
          prompt templates. Select an action you want the agent action to reference,
          and then configure it for use with an agent.
        </p>

        {/* Dropdown */}
        <label className="block text-sm font-medium mb-1 text-red-500">
          * Reference Action Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-6"
        >
          <option value="">Select a type of action...</option>
         <option value="apex">Rest API</option>
          <option value="flow">Web hook</option>
          <option value="prompt"> Lambda Function</option>
        </select>

        {/* Footer */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => history.back()} // ✅ go back
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            disabled={!selectedType}
            className={`px-4 py-2 rounded text-white ${
              selectedType
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
