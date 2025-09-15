// lib/api.ts
export interface Agent {
  id: string;
  name: string;
  description?: string;
}

const BASE_URL = "http://triasoft.io:8000/api";

export async function fetchAgents(token: string): Promise<Agent[]> {
  const res = await fetch(`${BASE_URL}/agents/`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

export async function deleteAgent(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/agents/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete agent");
  }
  return true;
}
