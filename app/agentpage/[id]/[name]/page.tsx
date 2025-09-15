// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Eye, Edit, Trash2, Plus } from "lucide-react";
// import Header from "@/components/Header";
// import { Agent, fetchAgents } from "@/lib/api";

// interface Topic {
//   id: string;
//   name: string;
//   description: string;
//   scope: string;
// }

// export default function AgentBuilderPage() {
//       const router = useRouter();
//   const { id,name } = useParams();
//   const [topics, setTopics] = useState<Topic[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState<string | null>(null);

//   const [error, setError] = useState<string | null>(null);
//   const agentName = decodeURIComponent(name as string);
//    useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const token =
//           typeof window !== "undefined"
//             ? localStorage.getItem("access_token")
//             : null;

//         if (!token) {
//           setError("No token found in localStorage.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch("http://triasoft.io:8000/api/topics/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to fetch topics: ${res.statusText}`);
//         }

//         const data = await res.json();
//         console.log("Topics API response:", data);
//         setTopics(data); // API should return an array of topics
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopics();
//   }, [id]);

//   // useEffect(() => {
//   //   // Example data, replace with API fetch
//   //   setTopics([
//   //     {
//   //       id: "1",
//   //       name: "Dining and Restaurant Support",
//   //       description: "This topic addresses customer questions about dining and reservations.",
//   //       scope: "This topic helps users manage restaurant-related tasks.",
//   //     },
//   //   ]);
//   // }, [id]);

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Header */}
//        <Header  agentName="Agent Builder"/>

//       <div className="flex flex-1">
//         {/* Sidebar */}
//        <aside className="w-56 bg-gray-100 border-r p-4 space-y-6">
//   <nav className="flex flex-col gap-6">
//     <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
//       <Eye className="w-6 h-6 mb-1" />
//       <span>Topics</span>
//     </button>
//     <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
//       <Edit className="w-6 h-6 mb-1" />
//       <span>Actions</span>
//     </button>
//     <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
//       <Plus className="w-6 h-6 mb-1" />
//       <span>Tools</span>
//     </button>
//     <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
//       <Trash2 className="w-6 h-6 mb-1" />
//       <span>Data Library</span>
//     </button>
//     <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
//       <Eye className="w-6 h-6 mb-1" />
//       <span>Event Logs</span>
//     </button>
//     <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
//       <Edit className="w-6 h-6 mb-1" />
//       <span>Connections</span>
//     </button>
//   </nav>
// </aside>


//         {/* Main Content */}
//         <main className="flex-1 bg-purple-50 p-6">
//           <h1 className="text-xl font-bold mb-4">
//             Agent <span className="text-gray-700">{agentName}</span>
//           </h1>

// <h1>{id}</h1>
//           <h2 className="text-lg font-semibold mb-2">Topics</h2>
//           <p className="text-gray-600 text-sm mb-4">
//             Manage the topics assigned to your agent. To make changes, your agent must be deactivated.
//           </p>

//         {/* Action Buttons & Search */}
// <div className="mb-4">
//   {/* New Topic button on top-right */}
// <div className="flex justify-end mb-2">
//   <button
//   onClick={() => router.push(`/topic/${id}`)}

//     className="flex items-center gap-2 bg-purple-700 text-white px-3 py-2 rounded-md hover:bg-purple-800"
//   >
//     <Plus className="w-4 h-4" /> New Topic
//   </button>
// </div>

//   {/* Search input below */}
//   <input
//   type="text"
//   placeholder="Search topics..."
//   className="w-full border rounded-md px-3 py-2 text-sm"
// />
// </div>

//           {/* Topics Table */}
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-purple-100 text-gray-700">
//                   <th className="px-4 py-2 text-left">Name</th>
//                   <th className="px-4 py-2 text-left">Classification Description</th>
//                   <th className="px-4 py-2 text-left">Scope</th>
//                   <th className="px-4 py-2 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//   {Array.isArray(topics) && topics.map((topic) => (
//     <tr key={topic.id} className="border-t hover:bg-gray-50">
//       <td className="px-4 py-2 text-purple-700 font-medium cursor-pointer hover:underline">
//         {topic.name}
//       </td>
//       <td className="px-4 py-2 text-sm text-gray-600">{topic.description}</td>
//       <td className="px-4 py-2 text-sm text-gray-600">{topic.scope}</td>
//       <td className="px-4 py-2 text-center flex justify-center gap-3">
//         <button className="text-gray-600 hover:text-purple-700">
//           <Eye className="w-5 h-5" />
//         </button>
//         <button className="text-gray-600 hover:text-blue-600">
//           <Edit className="w-5 h-5" />
//         </button>
//         <button className="text-gray-600 hover:text-red-600">
//           <Trash2 className="w-5 h-5" />
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>
//               {/* <tbody>
//                 {topics.map((topic) => (
//                   <tr key={topic.id} className="border-t hover:bg-gray-50">
//                     <td className="px-4 py-2 text-purple-700 font-medium cursor-pointer hover:underline">
//                       {topic.name}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{topic.description}</td>
//                     <td className="px-4 py-2 text-sm text-gray-600">{topic.scope}</td>
//                     <td className="px-4 py-2 text-center flex justify-center gap-3">
//                       <button className="text-gray-600 hover:text-purple-700">
//                         <Eye className="w-5 h-5" />
//                       </button>
//                       <button className="text-gray-600 hover:text-blue-600">
//                         <Edit className="w-5 h-5" />
//                       </button>
//                       <button className="text-gray-600 hover:text-red-600">
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody> */}
//             </table>
//           </div>
//         </main>

//         {/* Right Preview */}
//         <aside className="w-80 border-l bg-white p-6 flex flex-col items-center justify-center">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-12 h-12 bg-black rounded-full mb-3"></div>
//             <h3 className="font-semibold mb-1">Let's chat!</h3>
//             <p className="text-gray-600 text-sm">
//               Hi, I’m an AI assistant. How can I help you?
//             </p>
//             <input
//               type="text"
//               placeholder="Describe your task or ask a question..."
//               className="mt-4 w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }


"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Plus, Network, FileText, Library, Wrench, Tags } from "lucide-react";
import Header from "@/components/Header";
import ChatPreview from "@/components/ChatPreview";
import Sidebar from "@/components/SideBar";
import { Agent } from "@/lib/api";

interface Topic {
  id: string;
  name: string;
  description: string;
  scope: string;
}



export default function AgentBuilderPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  // const { id, name } = useParams();
  //   const params = useParams<{ id: string; name: string }>();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null); // for debugging
 const params = useParams();
  const id = params?.id as string;
  const rawName = params?.name as string
  const agentName = decodeURIComponent(rawName);

  const deleteTopic = async (topicId: string) => {
    if (!confirm("Are you sure you want to delete this topic?")) return;

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

      if (!token) {
        alert("No token found in localStorage (key: access_token).");
        return;
      }

      await axios.delete(`http://triasoft.io:8000/api/topics/${topicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      alert("Topic deleted successfully ✅");
      // Refresh topics list
      setTopics((prev) => prev.filter((t) => t.id !== topicId));
    } catch (err: any) {
      console.error("Delete topic error:", err);
      alert(err?.response?.data?.message || "Failed to delete topic ❌");
    }
  };
  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      setError(null);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

        if (!token) {
          setError("No token found in localStorage (key: access_token).");
          setTopics([]);
          setLoading(false);
          return;
        }

        const res = await fetch("http://triasoft.io:8000/api/topics/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        // helpful debug info
        console.log("Topics fetch status:", res.status, res.statusText);

        // read text then parse (handles non-json bodies without throwing)
        const text = await res.text();
        let data: any;
        try {
          data = text ? JSON.parse(text) : null;
        } catch (err) {
          // not JSON
          data = text;
        }
        console.log("Topics API raw response:", data);
        setRawResponse({ status: res.status, statusText: res.statusText, body: data });

        if (!res.ok) {
          // common helpful error messages
          if (res.status === 401 || res.status === 403) {
            throw new Error(`Unauthorized (status ${res.status}). Check token/permissions.`);
          }
          throw new Error(`Failed to fetch topics: ${res.status} ${res.statusText}`);
        }

        // Normalize: find an array in response or use response if it's already an array
        let items: any[] = [];

        if (Array.isArray(data)) {
          items = data;
        } else if (data == null) {
          items = [];
        } else if (Array.isArray(data.topics)) {
          items = data.topics;
        } else if (Array.isArray(data.results)) {
          items = data.results;
        } else if (Array.isArray((data as any).data)) {
          items = (data as any).data;
        } else {
          // attempt to find first array value on the object (best-effort)
          const firstArr = Object.values(data).find((v) => Array.isArray(v));
          if (Array.isArray(firstArr)) items = firstArr as any[];
        }

        // Map API items into Topic interface (handles several common field names)
        const mapped: Topic[] = items.map((it: any, idx: number) => ({
          id: it.id ?? it._id ?? it.uuid ?? String(idx),
          name:
            it.name ??
            it.label ??
            it.title ??
            it.topic_label ??
            it.topicName ??
            String(it.id ?? it._id ?? idx),
          description:
            it.description ?? it.classification_description ?? it.desc ?? it.summary ?? "",
          scope: it.scope ?? it.topic_scope ?? it.context ?? "",
        }));

        setTopics(mapped);
      } catch (err: any) {
        console.error("Fetch topics error:", err);
        setError(err?.message ?? "Something went wrong while fetching topics.");
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="h-screen flex flex-col">
      <Header agentName="Agent Builder" />

      <div className="flex flex-1">
        {/* Sidebar */}
         <Sidebar  />
        {/* <aside className="w-30 bg-gray-100 border-r p-4 space-y-6">
          <nav className="flex flex-col gap-6">
            <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
              <Tags className="w-6 h-6 mb-1" />
              <span>Topics</span>
            </button>
            <button 
              onClick={()=>router.push("/action")}
            className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
              <Edit className="w-6 h-6 mb-1" />
              <span>Actions</span>
            </button>
            <button 
             onClick={()=>router.push("/tool")}
            className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
              <Wrench className="w-6 h-6 mb-1" />
              <span>Tools</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
              <Library className="w-6 h-6 mb-1" />
              <span>Data Library</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
              <FileText className="w-6 h-6 mb-1" />
              <span>Event Log</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-purple-700 font-medium">
              <Network className="w-6 h-6 mb-1" />
              <span>Connections</span>
            </button>
          </nav>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 bg-purple-50 p-6">
          <h1 className="text-xl font-bold mb-4">
            Agent <span className="text-gray-700">{agentName}</span>
          </h1>

          <h2 className="text-lg font-semibold mb-2">Topics</h2>
          <p className="text-gray-600 text-sm mb-4">
            Manage the topics assigned to your agent. To make changes, your agent must be
            deactivated.
          </p>

          {/* Action Buttons & Search */}
          <div className="mb-4">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => router.push(`/topic/${id}`)}
                className="flex items-center gap-2 bg-purple-700 text-white px-3 py-2 rounded-md hover:bg-purple-800"
              >
                <Plus className="w-4 h-4" /> New Topic
              </button>
            </div>

            <input
              type="text"
              placeholder="Search topics..."
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Topics Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Loading / error states */}
            {loading ? (
              <div className="p-6 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="p-6 text-red-600">Error: {error}</div>
            ) : topics.length === 0 ? (
              <div className="p-6 text-gray-600">No topics found.</div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100 text-gray-700">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Classification Description</th>
                    <th className="px-4 py-2 text-left">Scope</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>

                </thead>
                <tbody>
                  {topics.map((topic) => (
                    <tr key={topic.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 text-purple-700 font-medium cursor-pointer hover:underline">
                        {topic.name}
                      </td>

                      <td className="px-4 py-2 text-sm text-gray-600">{topic.description}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{topic.scope}</td>
                      <td className="px-4 py-2 text-center flex justify-center gap-3">
                        <button className="text-gray-600 hover:text-purple-700">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                        onClick={() => router.push(`/topic/update-topic/${topic.id}`)}
                        className="text-gray-600 hover:text-blue-600">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteTopic(topic.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Debug panel: raw API response */}

        </main>

        {/* Right Preview */}
           <ChatPreview />
        {/* <aside className="w-80 border-l bg-white p-6 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-black rounded-full mb-3" />
            <h3 className="font-semibold mb-1">Let's chat!</h3>
            <p className="text-gray-600 text-sm">Hi, I’m an AI assistant. How can I help you?</p>
            <input
              type="text"
              placeholder="Describe your task or ask a question..."
              className="mt-4 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </aside> */}
      </div>
    </div>
  );
}
