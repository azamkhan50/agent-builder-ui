"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UpdateFormProps {
  agentId?: string;
}

export default function UpdateForm({ agentId }: UpdateFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  // Fetch agent if editing
  useEffect(() => {
    if (agentId && agentId !== "new") {
      const fetchAgent = async () => {
        try {
          const res = await fetch(`http://triasoft.io:8000/api/agents/${agentId}`);
          const data = await res.json();
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
        } catch (error) {
          console.error("Error fetching agent:", error);
        }
      };
      fetchAgent();
    }
  }, [agentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name, email, phone };

    try {
      const res = await fetch(
        agentId && agentId !== "new"
          ? `http://triasoft.io:8000/api/agents/${agentId}`
          : "http://triasoft.io:8000/api/agents/",
        {
          method: agentId && agentId !== "new" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert(agentId && agentId !== "new" ? "Agent updated!" : "Agent created!");
        router.push("/home");
      } else {
        alert("Error saving agent");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {agentId && agentId !== "new" ? "Update Agent" : "Create Agent"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {agentId && agentId !== "new" ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
