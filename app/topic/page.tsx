// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Plus, Trash2 } from "lucide-react";
// import Header from "@/components/Header";

// type CreateTopicPayload = {
//   label: string;
//   classification_description: string;
//   scope: string;
//   topic_instructions: string[];
//   agent_id: string;
// };

// const API_BASE = "http://127.0.0.1:8000";
// const TOPICS_ENDPOINT = `${API_BASE}/api/topics/`;

// // Change this if your agent page route differs
// const agentPageHref = (agentId: string) => `/agent-page?id=${encodeURIComponent(agentId)}`;

// export default function TopicCreationPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const agentId = useMemo(() => searchParams.get("agentId") ?? "", [searchParams]);

//   const [label, setLabel] = useState("");
//   const [description, setDescription] = useState(""); // classification_description
//   const [scope, setScope] = useState("");
//   const [instructions, setInstructions] = useState<string[]>([""]);

//   const [submitting, setSubmitting] = useState(false);

//   // Save/clear "route state" similar to your Flutter version
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("current_route", "/topic-creation");
//     if (agentId) localStorage.setItem("current_agent_id", agentId);
//     return () => {
//       localStorage.removeItem("current_route");
//       localStorage.removeItem("current_agent_id");
//     };
//   }, [agentId]);

//   const handleAddInstruction = () => {
//     setInstructions((prev) => [...prev, ""]);
//   };

//   const handleRemoveInstruction = (index: number) => {
//     setInstructions((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
//   };

//   const handleInstructionChange = (index: number, value: string) => {
//     setInstructions((prev) => prev.map((v, i) => (i === index ? value : v)));
//   };

//   const validate = () => {
//     if (!agentId) {
//       alert("Missing agentId. Pass ?agentId=YOUR_AGENT_ID in the URL.");
//       return false;
//     }
//     if (!label.trim()) {
//       alert("Please enter Topic Label.");
//       return false;
//     }
//     if (!description.trim()) {
//       alert("Please enter Classification Description.");
//       return false;
//     }
//     if (!scope.trim()) {
//       alert("Please enter Scope.");
//       return false;
//     }
//     return true;
//   };

//   const submit = async () => {
//     if (!validate()) return;

//     try {
//       setSubmitting(true);

//       const accessToken =
//         typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

//       if (!accessToken) {
//         alert("No access token found in localStorage under key 'access_token'.");
//         return;
//       }

//       const payload: CreateTopicPayload = {
//         label: label.trim(),
//         classification_description: description.trim(),
//         scope: scope.trim(),
//         topic_instructions: instructions.map((s) => s.trim()).filter(Boolean),
//         agent_id: agentId,
//       };

//       const res = await fetch(TOPICS_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`Failed to create topic: ${errText}`);
//       }

//       alert("Topic created successfully!");
//       // Navigate similar to Navigator.pop + pushReplacement
//       router.push(agentPageHref(agentId));
//     } catch (err: any) {
//       console.error(err);
//       alert(err?.message ?? "Failed to create topic");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header (optional): replace with your own Header component if needed */}
//      <Header  agentName="Agent Builder" />

//       <main className="mx-auto max-w-6xl px-4 py-6">
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
//           {/* Left column (title-only, like your Flutter left panel) */}
//           <aside className="hidden rounded-lg bg-white p-4 shadow-sm lg:block">
//             <h2 className="text-lg font-semibold">Topic Settings</h2>
//           </aside>

//           {/* Form */}
//           <section className="rounded-lg bg-white p-6 shadow-sm">
//             <div className="mx-auto w-full max-w-2xl">
//               <div className="mb-6 grid gap-4">
//                 {/* Topic Label */}
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">Topic Label</label>
//                   <input
//                     value={label}
//                     onChange={(e) => setLabel(e.target.value)}
//                     placeholder="Enter Topic Label..."
//                     className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//                   />
//                 </div>

//                 {/* Classification Description */}
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">
//                     Classification Description
//                   </label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Enter Classification Description..."
//                     rows={3}
//                     className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//                   />
//                 </div>

//                 {/* Scope */}
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">Scope</label>
//                   <textarea
//                     value={scope}
//                     onChange={(e) => setScope(e.target.value)}
//                     placeholder="Enter Scope..."
//                     rows={3}
//                     className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//                   />
//                 </div>

//                 {/* Instructions */}
//                 <div className="mt-2">
//                   <div className="mb-1 flex items-center justify-between">
//                     <label className="block text-sm font-semibold">Instructions</label>
                   
//                   </div>
//                   <p className="mb-3 text-sm text-gray-600">
//                     The following instructions are used to run this topic.
//                   </p>

//                   <div className="space-y-3">
//                     {instructions.map((val, idx) => (
//                       <div key={idx} className="flex items-start gap-2">
//                         <textarea
//                           value={val}
//                           onChange={(e) => handleInstructionChange(idx, e.target.value)}
//                           placeholder="Instruction"
//                           rows={3}
//                           className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveInstruction(idx)}
//                           className="px-2 py-2 text-gray-600 hover:text-red-600"
//                           title="Remove"
//                         >
//                           <Trash2 className="h-5 w-5" />
//                         </button>
                        
//                       </div>
//                     ))}
//                   </div>
//                   <div className="pt-10">
//                      <button
//                       type="button"
//                       onClick={handleAddInstruction}
//                       className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-3 py-2 text-sm font-medium text-white hover:bg-purple-800"
//                     >
//                       <Plus className="h-4 w-4" />
//                       Add Instruction
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="mt-6 flex items-center justify-between">
//                 <button
//                   type="button"
//                   onClick={() => router.back()}
//                   className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={submit}
//                   disabled={submitting}
//                   className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:opacity-50"
//                 >
//                   {submitting ? "Creating..." : "Create"}
//                 </button>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

//2

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Plus, Trash2 } from "lucide-react";
// import Header from "@/components/Header";

// type CreateTopicPayload = {
//   label: string;
//   classification_description: string;
//   scope: string;
//   topic_instructions: string[];
//   agent_id: string;
// };

// const API_BASE = "http://127.0.0.1:8000";
// const TOPICS_ENDPOINT = `${API_BASE}/api/topics/`;

// const agentPageHref = (agentId: string) =>
//   `/agent-page?id=${encodeURIComponent(agentId)}`;

// export default function TopicCreationPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const agentId = useMemo(() => searchParams.get("agentId") ?? "", [searchParams]);

//   const [label, setLabel] = useState("");
//   const [description, setDescription] = useState("");
//   const [scope, setScope] = useState("");
//   const [instructions, setInstructions] = useState<string[]>([""]);
//   const [submitting, setSubmitting] = useState(false);

//   // Save/clear route state
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("current_route", "/topic-creation");
//     if (agentId) localStorage.setItem("current_agent_id", agentId);
//     return () => {
//       localStorage.removeItem("current_route");
//       localStorage.removeItem("current_agent_id");
//     };
//   }, [agentId]);

//   const handleAddInstruction = () => {
//     setInstructions((prev) => [...prev, ""]);
//   };

//   const handleRemoveInstruction = (index: number) => {
//     setInstructions((prev) =>
//       prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
//     );
//   };

//   const handleInstructionChange = (index: number, value: string) => {
//     setInstructions((prev) =>
//       prev.map((v, i) => (i === index ? value : v))
//     );
//   };

//   const validate = () => {
//     if (!agentId) {
//       alert("Missing agentId. Pass ?agentId=YOUR_AGENT_ID in the URL.");
//       return false;
//     }
//     if (!label.trim()) {
//       alert("Please enter Topic Label.");
//       return false;
//     }
//     if (!description.trim()) {
//       alert("Please enter Classification Description.");
//       return false;
//     }
//     if (!scope.trim()) {
//       alert("Please enter Scope.");
//       return false;
//     }
//     if (!instructions.some((i) => i.trim())) {
//       alert("Please add at least one instruction.");
//       return false;
//     }
//     return true;
//   };

//   const submit = async () => {
//     if (!validate()) return;

//     try {
//       setSubmitting(true);

//       const accessToken =
//         typeof window !== "undefined"
//           ? localStorage.getItem("access_token")
//           : null;

//       if (!accessToken) {
//         alert("No access token found in localStorage under key 'access_token'.");
//         return;
//       }

//       const payload: CreateTopicPayload = {
//         label: label.trim(),
//         classification_description: description.trim(),
//         scope: scope.trim(),
//         topic_instructions: instructions.map((s) => s.trim()).filter(Boolean),
//         agent_id: agentId,
//       };

//       const res = await fetch(TOPICS_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`Failed to create topic: ${errText}`);
//       }

//       alert("Topic created successfully!");
//       router.push(agentPageHref(agentId));
//     } catch (err: any) {
//       console.error(err);
//       alert(err?.message ?? "Failed to create topic");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header agentName="Agent Builder" />

//       <main className="mx-auto max-w-4xl px-4 py-6">
//         <section className="rounded-lg bg-white p-6 shadow-sm">
//           <h2 className="mb-6 text-lg font-semibold">Topic Settings</h2>

//           <div className="space-y-6">
//             {/* Topic Label */}
//             <div>
//               <label className="mb-1 block text-sm font-medium">Topic Label</label>
//               <input
//                 value={label}
//                 onChange={(e) => setLabel(e.target.value)}
//                 placeholder="Enter Topic Label..."
//                 className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//               />
//             </div>

//             {/* Classification Description */}
//             <div>
//               <label className="mb-1 block text-sm font-medium">
//                 Classification Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter Classification Description..."
//                 rows={3}
//                 className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//               />
//             </div>

//             {/* Scope */}
//             <div>
//               <label className="mb-1 block text-sm font-medium">Scope</label>
//               <textarea
//                 value={scope}
//                 onChange={(e) => setScope(e.target.value)}
//                 placeholder="Enter Scope..."
//                 rows={3}
//                 className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//               />
//             </div>

//             {/* Instructions */}
//             <div>
//               <div className="mb-2 flex items-center justify-between">
//                 <label className="block text-sm font-semibold">Instructions</label>
//               </div>
//               <p className="mb-3 text-sm text-gray-600">
//                 The following instructions are used to run this topic.
//               </p>

//               <div className="space-y-3">
//                 {instructions.map((val, idx) => (
//                   <div key={idx} className="flex items-start gap-2">
//                     <textarea
//                       value={val}
//                       onChange={(e) =>
//                         handleInstructionChange(idx, e.target.value)
//                       }
//                       placeholder="Instruction"
//                       rows={3}
//                       className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveInstruction(idx)}
//                       className="px-2 py-2 text-gray-600 hover:text-red-600"
//                       title="Remove"
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="pt-6">
//                 <button
//                   type="button"
//                   onClick={handleAddInstruction}
//                   className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-3 py-2 text-sm font-medium text-white hover:bg-purple-800"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Add Instruction
//                 </button>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center justify-between pt-6">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={submit}
//                 disabled={submitting}
//                 className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:opacity-50"
//               >
//                 {submitting ? "Creating..." : "Create"}
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }


//3

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";

type CreateTopicPayload = {
  label: string;
  classification_description: string;
  scope: string;
  topic_instructions: string[];
  agent_id: string;
};

const API_BASE = "http://triasoft.io:8000/";
const TOPICS_ENDPOINT = `${API_BASE}/api/topics/`;
const agentPageHref = (agentId: string) => `/agent-page?id=${encodeURIComponent(agentId)}`;

export default function TopicCreationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = useMemo(() => searchParams.get("agentId") ?? "", [searchParams]);

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState("");
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [submitting, setSubmitting] = useState(false);

  // save route state
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("current_route", "/topic-creation");
    if (agentId) localStorage.setItem("current_agent_id", agentId);
    return () => {
      localStorage.removeItem("current_route");
      localStorage.removeItem("current_agent_id");
    };
  }, [agentId]);

  const handleAddInstruction = () => setInstructions((prev) => [...prev, ""]);
  const handleRemoveInstruction = (index: number) =>
    setInstructions((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  const handleInstructionChange = (index: number, value: string) =>
    setInstructions((prev) => prev.map((v, i) => (i === index ? value : v)));

  const validate = () => {
    if (!agentId) {
      alert("Missing agentId. Pass ?agentId=YOUR_AGENT_ID in the URL.");
      return false;
    }
    if (!label.trim()) {
      alert("Please enter Topic Label.");
      return false;
    }
    if (!description.trim()) {
      alert("Please enter Classification Description.");
      return false;
    }
    if (!scope.trim()) {
      alert("Please enter Scope.");
      return false;
    }
    if (instructions.every((i) => !i.trim())) {
      alert("Please enter at least one instruction.");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    try {
      setSubmitting(true);
      const accessToken =
        typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
      if (!accessToken) {
        alert("No access token found in localStorage under key 'access_token'.");
        return;
      }

      const payload: CreateTopicPayload = {
        label: label.trim(),
        classification_description: description.trim(),
        scope: scope.trim(),
        topic_instructions: instructions.map((s) => s.trim()).filter(Boolean),
        agent_id: agentId,
      };

      const res = await fetch(TOPICS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to create topic: ${errText}`);
      }

      alert("Topic created successfully!");
      router.push(agentPageHref(agentId));
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? "Failed to create topic");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header agentName="Agent Builder" />

      <main className="mx-auto max-w-3xl px-4 py-6">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          {/* Title */}
          <h2 className="mb-6 text-lg font-semibold">Topic Settings</h2>

          {/* Topic Label */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Topic Label</label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter Topic Label..."
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Classification Description */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Classification Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Classification Description..."
              rows={3}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Scope */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Scope</label>
            <textarea
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="Enter Scope..."
              rows={3}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-semibold">Instructions</label>
            </div>
            <p className="mb-3 text-sm text-gray-600">
              The following instructions are used to run this topic.
            </p>

            <div className="space-y-3">
              {instructions.map((val, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <textarea
                    value={val}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    placeholder="Instruction"
                    rows={3}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInstruction(idx)}
                    className="px-2 py-2 text-gray-600 hover:text-red-600"
                    title="Remove"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleAddInstruction}
                className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-3 py-2 text-sm font-medium text-white hover:bg-purple-800"
              >
                <Plus className="h-4 w-4" />
                Add Instruction
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
              type="button"
              onClick={submit}
              disabled={submitting}
              className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
