"use client";

import { useParams } from "next/navigation";
import { useBoardStore } from "@/store/useBoardStore";
import { useState } from "react";

import Link from "next/link";

export default function BoardPage() {
  const { id } = useParams();
  const board = useBoardStore((state) => state.getBoardById(id as string));
  const {
    addColumnToBoard,
    addCardToColumn,
    setDraggedCard,
    moveCardToColumn,
    deleteCard,
    deleteColumn,
    updateCardTitle,
    updateColumnTitle,
  } = useBoardStore();

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newCardTitles, setNewCardTitles] = useState<{ [key: string]: string }>({});

  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingCardValue, setEditingCardValue] = useState("");

  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingColumnValue, setEditingColumnValue] = useState("");


  if (!board) {
    return (
      <main className="p-8 text-center text-red-600">
        Quadro não encontrado.
      </main>
    );
  }

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") return;
    addColumnToBoard(board.id, newColumnTitle.trim());
    setNewColumnTitle("");
  }

  return (
    <main className="min-h-screen bg-blue-100 p-8">
        <Link
            href="/"
            className="inline-block mb-4 text-blue-700 hover:underline font-medium"
            >
            ← Voltar
        </Link>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">{board.title}</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Nova coluna"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          className="px-4 py-2 border border-blue-300 rounded w-full max-w-sm text-gray-800 placeholder-gray-500 bg-white shadow-sm"
        />
        <button
          onClick={handleAddColumn}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Adicionar
        </button>
      </div>

      {board.columns.length === 0 ? (
        <div className="text-gray-600 italic">Nenhuma coluna ainda.</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          {board.columns.map((column) => (
            <div
              key={column.id}
              className="bg-white p-4 rounded shadow w-64 flex-shrink-0 border border-blue-200"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => moveCardToColumn(board.id, column.id)}
            >
                <div className="flex justify-between items-center mb-2">
                    {editingColumnId === column.id ? (
                        <input
                            type="text"
                            value={editingColumnValue}
                            onChange={(e) => setEditingColumnValue(e.target.value)}
                            onBlur={() => {
                            updateColumnTitle(board.id, column.id, editingColumnValue);
                            setEditingColumnId(null);
                            }}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateColumnTitle(board.id, column.id, editingColumnValue);
                                setEditingColumnId(null);
                            }
                            }}
                            autoFocus
                            className="text-base font-semibold text-gray-800 p-1 w-full bg-white border border-blue-300 rounded"
                        />
                        ) : (
                        <h2
                            onDoubleClick={() => {
                            setEditingColumnId(column.id);
                            setEditingColumnValue(column.title);
                            }}
                            className="text-lg font-semibold text-blue-800 cursor-pointer"
                            title="Clique duas vezes para editar"
                        >
                            {column.title}
                        </h2>
                    )}

                    <button
                        onClick={() => deleteColumn(board.id, column.id)}
                        className="text-black hover:text-red-700 text-sm"
                        title="Excluir coluna"
                    >
                        ✕
                    </button>
                </div>

                <ul className="space-y-2 mb-4">
                {column.cards.map((card) => (
                    <li
                        key={card.id}
                        className="bg-gray-100 rounded p-2 text-gray-800 shadow-sm"
                        draggable
                        onDragStart={() =>
                            setDraggedCard({ cardId: card.id, fromColumnId: column.id })
                        }
                    >
                        <div className="flex justify-between items-center ">
                            {editingCardId === card.id ? (
                                <input
                                    type="text"
                                    value={editingCardValue}
                                    onChange={(e) => setEditingCardValue(e.target.value)}
                                    onBlur={() => {
                                    updateCardTitle(board.id, column.id, card.id, editingCardValue);
                                    setEditingCardId(null);
                                    }}
                                    onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateCardTitle(board.id, column.id, card.id, editingCardValue);
                                        setEditingCardId(null);
                                    }
                                    }}
                                    autoFocus
                                    className="text-sm p-1 w-full bg-white border border-blue-300 rounded"
                                />
                                ) : (
                                <span
                                    onDoubleClick={() => {
                                    setEditingCardId(card.id);
                                    setEditingCardValue(card.title);
                                    }}
                                    className="cursor-pointer w-full"
                                    title="Clique duas vezes para editar"
                                >
                                    {card.title}
                                </span>
                            )}

                            <button
                                onClick={() => deleteCard(board.id, column.id, card.id)}
                                className="ml-2 text-black hover:text-red-700 text-sm"
                                title="Excluir card"
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                ))}
                </ul>

                <input
                    type="text"
                    placeholder="Novo card"
                    value={newCardTitles[column.id] || ""}
                    onChange={(e) =>
                    setNewCardTitles((prev) => ({
                        ...prev,
                        [column.id]: e.target.value,
                    }))
                    }
                    className="w-full mb-2 px-2 py-1 border border-blue-300 rounded text-gray-800 placeholder-gray-500 text-sm"
                />

                <button
                    onClick={() => {
                    const title = newCardTitles[column.id]?.trim();
                    if (title) {
                        addCardToColumn(board.id, column.id, title);
                        setNewCardTitles((prev) => ({ ...prev, [column.id]: "" }));
                    }
                    }}
                    className="w-full bg-blue-500 text-white py-1 text-sm rounded hover:bg-blue-600"
                >
                    Adicionar Card
                </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}