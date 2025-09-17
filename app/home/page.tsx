
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import AgentTable from "@/components/AgentTable";
import { fetchAgents, deleteAgent, Agent } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

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

    const loadAgents = async () => {
      try {
        const data = await fetchAgents(storedToken);
        setAgents(data);
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, [router]);

  const handleDelete = async (id: string, name: string) => {
    if (!token) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    try {
      await deleteAgent(id, token);
      alert(`Agent ${name} deleted successfully.`);
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header  agentName="Agent Builder" />
      <main className="flex-1 p-6">
        <AgentTable agents={agents} userName={userName} loading={loading} onDelete={handleDelete} />
      </main>
    </div>
  );
}
