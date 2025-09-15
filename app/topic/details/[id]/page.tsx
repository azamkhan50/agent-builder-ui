// "use client";

// import { useParams, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { Plus } from "lucide-react";

// import Header from "@/components/Header";
// import Sidebar from "@/components/SideBar";
// import ChatPreview from "@/components/ChatPreview";
// import { useRouter } from "next/navigation";

// export default function TopicDetailsPage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//    const router = useRouter(); 
//   const topicId = params?.id as string;

//   // Fix for proper name (decode + trim + collapse spaces)
//   const rawName = searchParams.get("name") || "Unnamed Topic";
//   const topicName = decodeURIComponent(rawName).trim().replace(/\s+/g, " ");

//   const [showActions, setShowActions] = useState(false);

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Top Header */}
//       <Header agentName="Agent Builder" />

//       {/* Main Layout */}
//       <div className="flex flex-1">
//         {/* Left Sidebar */}
//         <Sidebar agentId={topicId} agentName={topicName} />

//         {/* Main Content */}
//         <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
//           {/* Header Section */}
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-purple-700">
//               Topic Details – {topicName}
//             </h1>
//           </div>

//           {/* Actions Section */}
//           <div className="bg-white shadow rounded-lg p-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">This Topic&apos;s Actions</h2>
//               <button
//                             onClick={() => router.push("/action/createaction")} 
//                 className="flex items-center gap-2 bg-purple-700 text-white px-3 py-2 rounded-md hover:bg-purple-800"
//               >
//                 <Plus className="w-4 h-4" /> Add Action
//               </button>
//             </div>

//             {/* Toggleable Add Options */}
//             {showActions && (
//               <div className="space-y-3">
//                 <button className="flex items-center gap-2 border rounded-md px-3 py-2 w-full hover:bg-gray-100">
//                   🌐 Add from Asset Library
//                 </button>
//                 <button className="flex items-center gap-2 border rounded-md px-3 py-2 w-full hover:bg-gray-100">
//                   ➕ New Action
//                 </button>
//               </div>
//             )}

//             {/* Static Example List */}
//             <div className="mt-6 space-y-3">
//               <div className="flex items-center justify-between border rounded-md px-3 py-2">
//                 <span>Identify Object by Name</span>
//               </div>
//               <div className="flex items-center justify-between border rounded-md px-3 py-2">
//                 <span>Query Records (Beta)</span>
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Right Chat Preview */}
//         <ChatPreview />
//       </div>
//     </div>
//   );
// }



"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import ChatPreview from "@/components/ChatPreview";

export default function TopicDetailsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const topicId = params?.id as string;

    // Fix for proper name (decode + trim + collapse spaces)
    const rawName = searchParams.get("name") || "Unnamed Topic";
    const topicName = decodeURIComponent(rawName).trim().replace(/\s+/g, " ");

    const [activeTab, setActiveTab] = useState<"config" | "actions">("actions");

    return (
        <div className="h-screen flex flex-col">
            {/* Top Header */}
            <Header agentName="Agent Builder" />

            {/* Main Layout */}
            <div className="flex flex-1">
                {/* Left Sidebar */}
                <Sidebar agentId={topicId} agentName={topicName} />

                {/* Main Content */}
                <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-purple-700">
                            Topic Details – {topicName}
                        </h1>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b mb-6">
                        <button
                            onClick={() => setActiveTab("config")}
                            className={`px-4 py-2 font-medium ${activeTab === "config"
                                    ? "text-purple-700 border-b-2 border-purple-700"
                                    : "text-gray-500 hover:text-purple-600"
                                }`}
                        >
                            Topic Configuration
                        </button>
                        <button
                            onClick={() => setActiveTab("actions")}
                            className={`ml-4 px-4 py-2 font-medium ${activeTab === "actions"
                                    ? "text-purple-700 border-b-2 border-purple-700"
                                    : "text-gray-500 hover:text-purple-600"
                                }`}
                        >
                            This&apos;s Topic Actions
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "actions" && (
                        <div className="bg-white shadow rounded-lg p-4">
                            {/* Info Message */}
                            <h2 className="mb-4 text-sm text-black font-semibold">
                                To manage the actions assigned to your topic, you must deactivate your agent.
                                <br />
                                This is required to add or remove actions.
                            </h2>

                            {/* Header + Add Action + Search */}
                            <div className="flex justify-between items-center mb-4">


                                <div className="flex gap-3 w-full">
                                    {/* Search Input */}
                                    <input
                                        type="text"
                                        placeholder="Search actions..."
                                        className="flex-1 border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                    {/* Add Action */}
                                    <button
                                        onClick={() => router.push("/action/createaction")}
                                        className="flex items-center gap-2 bg-purple-700 text-white px-3 py-2 rounded-md hover:bg-purple-800"
                                    >
                                        <Plus className="w-4 h-4" /> Add Action
                                    </button>
                                </div>
                            </div>

                            {/* Static Example List */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center justify-between border rounded-md px-3 py-2">
                                    <span>Identify Object by Name</span>
                                </div>
                                <div className="flex items-center justify-between border rounded-md px-3 py-2">
                                    <span>Query Records (Beta)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "config" && (
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-4">Topic Configuration</h2>
                            <p className="text-gray-600">⚙️ Configuration settings go here...</p>
                        </div>
                    )}
                </main>

                {/* Right Chat Preview */}
                <ChatPreview />
            </div>
        </div>
    );
}
