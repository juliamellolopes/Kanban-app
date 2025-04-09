import { create } from "zustand";
import { Board } from "@/types";
import { persist } from "zustand/middleware";

interface BoardState {
  boards: Board[];
  addBoard: (title: string) => void;
  getBoardById: (id: string) => Board | undefined;
  updateBoard: (updatedBoard: Board) => void;
  addColumnToBoard: (boardId: string, columnTitle: string) => void;
  addCardToColumn: (boardId: string, columnId: string, cardTitle: string) => void;
  draggedCard: { cardId: string; fromColumnId: string } | null;
  setDraggedCard: (data: { cardId: string; fromColumnId: string } | null) => void;
  moveCardToColumn: (boardId: string, toColumnId: string) => void;  
  deleteCard: (boardId: string, columnId: string, cardId: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  updateCardTitle: (boardId: string, columnId: string, cardId: string, newTitle: string) => void;
  updateColumnTitle: (boardId: string, columnId: string, newTitle: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: [],
      addBoard: (title) => {
        const newBoard: Board = {
          id: crypto.randomUUID(),
          title,
          columns: [],
        };
        set({ boards: [...get().boards, newBoard] });
      },

      getBoardById: (id) => get().boards.find((b) => b.id === id),
      
      updateBoard: (updatedBoard) => {
        const updated = get().boards.map((b) =>
          b.id === updatedBoard.id ? updatedBoard : b
        );
        set({ boards: updated });
      },

      addColumnToBoard: (boardId, columnTitle) => {
        const board = get().boards.find((b) => b.id === boardId);
        if (!board) return;

        const newColumn = {
          id: crypto.randomUUID(),
          title: columnTitle,
          cards: [],
        };

        const updatedBoard = {
          ...board,
          columns: [...board.columns, newColumn],
        };

        get().updateBoard(updatedBoard);
      },

      addCardToColumn: (boardId, columnId, cardTitle) => {
        const board = get().boards.find((b) => b.id === boardId);
        if (!board) return;
      
        const updatedColumns = board.columns.map((column) => {
          if (column.id !== columnId) return column;
      
          const newCard = {
            id: crypto.randomUUID(),
            title: cardTitle,
          };
      
          return {
            ...column,
            cards: [...column.cards, newCard],
          };
        });
      
        const updatedBoard = {
          ...board,
          columns: updatedColumns,
        };
      
        get().updateBoard(updatedBoard);
      }, 

      draggedCard: null,
        setDraggedCard: (data) => {
            set({ draggedCard: data });
      },

      moveCardToColumn: (boardId, toColumnId) => {
        const { draggedCard } = get();
        if (!draggedCard) return;
      
        const board = get().boards.find((b) => b.id === boardId);
        if (!board) return;
      
        const fromColumn = board.columns.find((c) => c.id === draggedCard.fromColumnId);
        const toColumn = board.columns.find((c) => c.id === toColumnId);
        if (!fromColumn || !toColumn) return;
      
        const card = fromColumn.cards.find((c) => c.id === draggedCard.cardId);
        if (!card) return;
      
        const updatedFrom = {
          ...fromColumn,
          cards: fromColumn.cards.filter((c) => c.id !== draggedCard.cardId),
        };
        const updatedTo = {
            ...toColumn,
            cards: [...toColumn.cards, card],
          };
        
          const updatedColumns = board.columns.map((col) => {
            if (col.id === fromColumn.id) return updatedFrom;
            if (col.id === toColumn.id) return updatedTo;
            return col;
          });
        
          get().updateBoard({ ...board, columns: updatedColumns });
          set({ draggedCard: null });
        },

        deleteCard: (boardId, columnId, cardId) => {
            const board = get().boards.find((b) => b.id === boardId);
            if (!board) return;
          
            const updatedColumns = board.columns.map((column) => {
              if (column.id !== columnId) return column;
              return {
                ...column,
                cards: column.cards.filter((card) => card.id !== cardId),
              };
            });
          
            get().updateBoard({ ...board, columns: updatedColumns });
        }, 

        deleteColumn: (boardId, columnId) => {
            const board = get().boards.find((b) => b.id === boardId);
            if (!board) return;
          
            const updatedColumns = board.columns.filter((col) => col.id !== columnId);
            get().updateBoard({ ...board, columns: updatedColumns });
        },      

        updateCardTitle: (boardId, columnId, cardId, newTitle) => {
            const board = get().boards.find((b) => b.id === boardId);
            if (!board) return;
          
            const updatedColumns = board.columns.map((col) => {
              if (col.id !== columnId) return col;
          
              const updatedCards = col.cards.map((card) =>
                card.id === cardId ? { ...card, title: newTitle } : card
              );
          
              return { ...col, cards: updatedCards };
            });
          
            get().updateBoard({ ...board, columns: updatedColumns });
        },

        updateColumnTitle: (boardId, columnId, newTitle) => {
            const board = get().boards.find((b) => b.id === boardId);
            if (!board) return;
          
            const updatedColumns = board.columns.map((col) =>
              col.id === columnId ? { ...col, title: newTitle } : col
            );
          
            get().updateBoard({ ...board, columns: updatedColumns });
        },   
    }),
    {
      name: "kanban-storage",
    }
  )
);
