"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface AgentFormProps {
  agentId?: string; // null for new agent
  onClose: () => void;
  onSaved: () => void;
}

export default function UpdateAgentForm({ agentId, onClose, onSaved }: AgentFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    api_name: "",
    description: "",
    role: "",
    organization: "",
    user_type: "",
  });

  // fetch agent details when editing
  useEffect(() => {
    if (!agentId) return;
    const fetchAgent = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(`http://triasoft.io:8000/api/agents/${agentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setForm({
            name: data.name ?? "",
            api_name: data.api_name ?? "",
            description: data.description ?? "",
            role: data.role ?? "",
            organization: data.organization ?? "",
            user_type: data.user_type ?? "",
          });
        }
      } catch (err) {
        console.error("Error fetching agent:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, [agentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("No token found, please login.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        agentId
          ? `http://triasoft.io:8000/api/agents/${agentId}`
          : "http://triasoft.io:8000/api/agents/",
        {
          method: agentId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        alert(agentId ? "Agent updated successfully!" : "Agent created successfully!");
        onSaved();
        onClose();
      } else {
        const err = await res.json();
        alert(err.detail || "Failed to save agent");
      }
    } catch (e) {
      console.error("Error saving agent:", e);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {agentId ? "Update Agent" : "New Agent"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Service Agent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">API Name</label>
            <input
              name="api_name"
              value={form.api_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Service_Agent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Deliver personalized customer interactions..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              placeholder="AI customer service agent..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Organization</label>
            <input
              name="organization"
              value={form.organization}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Your organization..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Agent User</label>
            <select
              name="user_type"
              value={form.user_type}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select user type</option>
              <option value="user">New Agent User</option>
              <option value="existing_user">Existing Agent User</option>
              <option value="integration_user">Integration User</option>
              <option value="security_user">Security User</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-[#6a44b1] text-white rounded hover:bg-[#5a3798] disabled:opacity-50"
          >
            {loading ? "Saving..." : agentId ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
