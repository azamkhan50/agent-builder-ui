"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";

type TopicPayload = {
  label: string;
  classification_description: string;
  scope: string;
  topic_instructions: string[];
  agent_id: string;
};

const API_BASE = "http://triasoft.io:8000";
const TOPICS_ENDPOINT = `${API_BASE}/api/topics`;

const TopicUpdatePage = () => {
  const { id } = useParams(); // ✅ topicId from URL
  const router = useRouter();

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState("");
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Fetch topic details on mount
//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         if (!token) return alert("No token found.");

//         const res = await fetch(`${TOPICS_ENDPOINT}/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to fetch topic: ${res.status}`);
//         }

//         const data = await res.json();
//         // Prefill fields
//         setLabel(data.label || "");
//         setDescription(data.classification_description || "");
//         setScope(data.scope || "");
//         setInstructions(data.topic_instructions || [""]);
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching topic");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchTopic();
//   }, [id]);
useEffect(() => {
  const fetchTopic = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return alert("No token found.");

      const res = await fetch(`${TOPICS_ENDPOINT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch topic: ${res.status}`);
      }

      const data = await res.json();

      // ✅ Normalize instructions: string[] only
      let normalizedInstructions: string[] = [];
      if (Array.isArray(data.topic_instructions)) {
        normalizedInstructions = data.topic_instructions.map((item: any) =>
          typeof item === "string" ? item : item?.text || JSON.stringify(item)
        );
      }

      setLabel(data.label || "");
      setDescription(data.classification_description || "");
      setScope(data.scope || "");
      setInstructions(normalizedInstructions.length ? normalizedInstructions : [""]);
    } catch (err) {
      console.error(err);
      alert("Error fetching topic");
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchTopic();
}, [id]);

  // 🔹 Update API
  const handleUpdate = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("access_token");
      if (!token) return alert("No token found.");

      const payload: TopicPayload = {
        label,
        classification_description: description,
        scope,
        topic_instructions: instructions.filter(Boolean),
        agent_id: "", // 🔹 if needed, pass actual agent_id (depends on your backend)
      };

      const res = await fetch(`${TOPICS_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to update: ${err}`);
      }

      alert("✅ Topic updated successfully!");
      router.back();
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  // 🔹 Handlers for instructions
  const handleAddInstruction = () => setInstructions((prev) => [...prev, ""]);
  const handleRemoveInstruction = (index: number) =>
    setInstructions((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  const handleInstructionChange = (index: number, value: string) =>
    setInstructions((prev) => prev.map((v, i) => (i === index ? value : v)));

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header agentName="Agent Builder" />

      <main className="mx-auto max-w-3xl px-4 py-6">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Update Topic</h2>

          {/* Topic Label */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Topic Label</label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Classification Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Scope */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Scope</label>
            <textarea
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              rows={3}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <label className="block text-sm font-semibold">Instructions</label>
            <div className="space-y-3 mt-2">
              {instructions.map((val, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <textarea
                    value={val}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    rows={2}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInstruction(idx)}
                    className="px-2 py-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-3">
              <button
                onClick={handleAddInstruction}
                className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-3 py-2 text-sm font-medium text-white hover:bg-purple-800"
              >
                <Plus className="h-4 w-4" /> Add Instruction
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={submitting}
              className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:opacity-50"
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopicUpdatePage;
