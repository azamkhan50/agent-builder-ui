




// new latestes 2
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, User, LogOut } from "lucide-react";

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
}

export default function AgentForm({ agentId }: AgentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    api_name: "",
    description: "",
    role: "",
    organization: "",
    user_type: "user",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Load token & username
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");

    if (!storedToken) {
      router.push("/");
      return;
    }

    setToken(storedToken);
    setUserName(`${firstName ?? ""} ${lastName ?? ""}`.trim());
  }, [router]);

  // ✅ Fetch agent details if editing
  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!agentId) {
        setIsLoading(false);
        return;
      }

      if (!token) return;

      try {
        const res = await fetch(`http://triasoft.io:8000/api/agents/${agentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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
  }, [agentId, token]);

  // ✅ Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!token) {
      setError("Authentication error: No token found");
      setIsSubmitting(false);
      return;
    }

    const apiUrl = agentId
      ? `http://triasoft.io:8000/api/agents/${agentId}`
      : "http://triasoft.io:8000/api/agents/";

    const method = agentId ? "PUT" : "POST";

    try {
      const res = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to save agent");
      }

      alert(agentId ? "Agent updated successfully!" : "Agent created successfully!");
      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Network error while saving agent");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="w-full bg-[#6750a4] text-white flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">Agent Builder</h1>
        <div className="flex items-center gap-4 relative">
          <Bell className="w-6 h-6 cursor-pointer" />
          {userName ? (
            <div className="relative" ref={menuRef}>
              <User
                className="w-6 h-6 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg p-3">
                  <p className="text-sm mb-2">
                    Welcome, <strong>{userName}</strong>
                  </p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 w-full text-left text-sm text-violet-600 px-2 py-1 rounded hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="text-sm">Not logged in</span>
          )}
        </div>
      </header>

      {/* Main layout: 3 columns on lg+ */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[240px_1fr_320px]">
        
        {/* Left Sidebar - Steps */}
        <aside className="bg-white p-6 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-violet-700">Steps</h2>
          <ul className="space-y-3">
            {["Select Type", "Review Topics", "Define Settings", "Select Data"].map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                    index < 3 ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {index < 3 ? "✓" : ""}
                </div>
                <span
                  className={`text-sm font-medium ${
                    index < 3 ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Middle - Form */}
        <main className="overflow-y-auto p-6 bg-gray-50">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {agentId ? "Update Agent" : "Create New Agent"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Service Agent"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  API Name
                </label>
                <input
                  name="api_name"
                  value={formData.api_name}
                  onChange={handleChange}
                  required
                  placeholder="Service_Agent"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Role
                </label>
                <textarea
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Organization
                </label>
                <textarea
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Agent User
                </label>
                <select
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
                >
                  <option value="user">New Agent User</option>
                  <option value="existing_user">Existing Agent User</option>
                  <option value="integration_user">Integration User</option>
                  <option value="security_user">Security User</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-[#6a44b1] text-white hover:bg-[#5b3c94] disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : agentId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </main>

        {/* Right Sidebar - Best Practices */}
        <aside className="hidden lg:block bg-gray-100 p-6 border-l border-gray-200 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4 text-gray-700">
            Best Practices for Agent Settings
          </h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>
              Agent settings determine how an AI agent behaves and presents itself in conversations. 
              Use these best practices to help you write concise and conversational descriptions.
            </li>
            <li>
              <strong className="block text-gray-800">Role:</strong>
              The role setting is the job description for the agent. Include responsibilities,
              functions, and target audience. Start with “You are…”.
            </li>
            <li>
              <strong className="block text-gray-800">Organization:</strong>
              Tell the agent about the organization it represents. Describe what your organization
              does, who its customers are, and what makes it unique.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
