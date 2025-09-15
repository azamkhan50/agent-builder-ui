"use client";

import { Edit, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Agent } from "@/lib/api";
import slugify from "slugify";

interface Props {
    agents: Agent[];
    userName: string | null;
    loading: boolean;
    onDelete: (id: string, name: string) => void;
}

export default function AgentTable({ agents, userName, loading, onDelete }: Props) {
    
    const router = useRouter();

    const handleEdit = (id: string) => {
        router.push(`/agentbuilder/${id}`);
    };

    const handleNew = () => {
        router.push("/agentbuilder");
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (agents.length === 0) {
        return (
            <div className="relative flex flex-col items-center justify-center">
                <div className="absolute top-15 right-4">
                    <button
                        onClick={handleNew}
                        className="flex items-center gap-2 bg-[#6750a4] text-white px-3 py-1.5 rounded-full shadow hover:bg-[#5a3798]"
                    >
                        <Plus className="w-4 h-4" /> New Agent
                    </button>
                </div>
                <Image src="/image1.jpg" alt="No agents" width={300} height={300} className="mb-4" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Agents</h2>
                
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 bg-[#6a44b1] text-white px-3 py-1.5 rounded-full shadow hover:bg-[#5a3798]"
                >
                    <Plus className="w-4 h-4" /> New Agent
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#6750a4] text-white">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Created By</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent, index) => (
                            <tr
                                key={agent.id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                            >
                                <td
                                   onClick={() =>// when navigating
router.push(`/agentpage/${agent.id}/${slugify(agent.name, { lower: true })}`)
                                    
                                    
                                    //router.push(`/agentpage/${agent.id}/${encodeURIComponent(agent.name)}`)
                                
                                
                                }
                                    className="px-4 py-2 text-violet-700 font-semibold cursor-pointer hover:underline"
                                >
                                    {agent.name}
                                </td>
                                {/* <td className="px-4 py-2 text-violet-700 font-semibold">{agent.name}</td> */}
                                <td className="px-4 py-2">{agent.description ?? "No description"}</td>
                                <td className="px-4 py-2">{userName}</td>
                                
                                <td className="px-4 py-2 flex justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(agent.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(agent.id, agent.name)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
