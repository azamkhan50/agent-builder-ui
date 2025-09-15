"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface AgentFormData {
  name: string;
  api_name: string;
  description: string;
  role: string;
  organization: string;
  user_type: string;
}

interface AgentFormProps {
  agentId?: string | null;
  onSuccess: (message: string) => void;
  onCancel: () => void;
}

export default function AgentForm({
  agentId,
  onSuccess,
  onCancel,
}: AgentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    api_name: "",
    description: "",
    role: "",
    organization: "",
    user_type: "user", // Default value
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch agent data if agentId is provided (for update)
  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!agentId) {
        setIsLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setError("Authentication error: No token found");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://triasoft.io:8000/api/agents/${agentId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || "Failed to fetch agent details");
        }

        const data = await res.json();
        setFormData({
          name: data.name ?? "",
          api_name: data.api_name ?? "",
          description: data.description ?? "",
          role: data.role ?? "",
          organization: data.organization ?? "",
          user_type: data.user_type ?? "user",
        });
      } catch (err: any) {
        setError(err.message || "Network error while fetching agent details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgentDetails();
  }, [agentId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("Authentication error: No token found");
      setIsSubmitting(false);
      return;
    }

    const apiUrl = `http://triasoft.io:8000/api/agents/${agentId}`;
    const method = "PUT";

    try {
      const res = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to update agent");
      }

      const message = agentId ? "Agent updated successfully!" : "Agent created successfully!";
      onSuccess(message);
    } catch (err: any) {
      setError(err.message || "Network error while updating agent");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="w-60 bg-white p-6 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-violet-700">Steps</h2>
        <ul className="space-y-2">
          {["Select Type", "Review Topics", "Define Settings", "Select Data"].map(
            (step, index) => (
              <li key={step} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    index < 3 ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {index < 3 && <ArrowLeft size={10} className="text-white rotate-180" />}
                </div>
                <span
                  className={`text-sm font-medium ${
                    index < 3 ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Main Form */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pr-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {agentId ? "Update Agent" : "Create New Agent"}
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Service Agent"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="api_name" className="block text-sm font-bold text-gray-700 mb-1">API Name</label>
                    <input
                      type="text"
                      id="api_name"
                      name="api_name"
                      value={formData.api_name}
                      onChange={handleChange}
                      placeholder="Service_Agent"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Deliver personalized customer interactions with an AI agent."
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    ></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                    <textarea
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      rows={3}
                      placeholder="An AI customer service agent to help customers."
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    ></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="organization" className="block text-sm font-bold text-gray-700 mb-1">Organization</label>
                    <textarea
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Your organization specializes in providing CRM software."
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    ></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="user_type" className="block text-sm font-bold text-gray-700 mb-1">Agent User</label>
                    <select
                      id="user_type"
                      name="user_type"
                      value={formData.user_type}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="user">New Agent User</option>
                      <option value="existing_user">Existing Agent User</option>
                      <option value="integration_user">Integration User</option>
                      <option value="security_user">Security User</option>
                    </select>
                </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end gap-2 border-t pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-[#6a44b1] text-white hover:bg-[#5b3c94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : agentId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* Best Practices Panel */}
      <div className="hidden lg:block w-80 bg-gray-100 p-6 border-l border-gray-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Best Practices for Agent Settings</h3>
        <ul className="space-y-4 text-sm text-gray-600">
          <li>
            <strong className="block text-gray-800">Agent settings determine how an AI agent behaves.</strong>
            They define the agent's identity, behavior, and purpose.
          </li>
          <li>
            <strong className="block text-gray-800">Role:</strong>
            The role setting is the job description for the AI. Start the description with "You are..." to give it a clear identity.
          </li>
          <li>
            <strong className="block text-gray-800">Organization:</strong>
            Provide the agent with context about the organization it represents. This helps it align with your company's tone and policies.
          </li>
        </ul>
      </div>
    </div>
  );
}