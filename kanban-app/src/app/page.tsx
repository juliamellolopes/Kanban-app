"use client";

import { useState } from "react";
import { useBoardStore } from "@/store/useBoardStore";
import Link from "next/link";

export default function Home() {
  const { boards, addBoard } = useBoardStore();
  const [title, setTitle] = useState("");

  const handleCreateBoard = () => {
    if (title.trim() === "") return;
    addBoard(title.trim());
    setTitle("");
  };

  return (
    <main className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Meus Projetos</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome do novo quadro"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border border-blue-300 rounded w-full max-w-md text-gray-800 placeholder-gray-500 bg-white shadow-sm"
        />
        <button
          onClick={handleCreateBoard}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Criar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map((board) => (
          // <div
          //   key={board.id}
          //   className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer border border-blue-200"
          // >
          //   <h2 className="text-xl font-semibold text-gray-800">{board.title}</h2>
          // </div>
          <Link href={`/board/${board.id}`} key={board.id}>
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-800">{board.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
