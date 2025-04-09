export interface Card {
    id: string;
    title: string;
    content?: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    cards: Card[];
  }
  
  export interface Board {
    id: string;
    title: string;
    columns: Column[];
  }
  