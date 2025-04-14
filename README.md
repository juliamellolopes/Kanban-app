# Kanban App — Desafio Técnico

Este é um projeto de um sistema de Kanban desenvolvido como parte de um desafio técnico. A aplicação foi construída utilizando **Next.js**, **TypeScript**, **TailwindCSS** e gerenciamento global de estado com **Zustand**, conforme exigido no enunciado.

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🎯 Funcionalidades Implementadas

### ✅ Dashboard de Quadros
- Criação de múltiplos quadros
- Persistência local automática via Zustand + localStorage
- Navegação para cada quadro individual

### ✅ Página de Quadro
- Criação de colunas com títulos editáveis
- Criação de cards dentro das colunas
- Cards com níveis de **prioridade**: alta, média e baixa (ícones coloridos)
- Edição de título de cards e colunas com **clique duplo**
- Exclusão de colunas e cards
- Confirmação visual e hover antes de excluir
- **Drag and Drop manual de cards** entre colunas, sem uso de bibliotecas externas
- Estilo responsivo com scroll horizontal fluido
- Feedback visual ao arrastar (cards com opacidade)
- Campo de **busca para filtrar colunas** por título

---

## ✅ Estado Global com Zustand

Toda a lógica da aplicação é gerenciada com Zustand, incluindo:

- Lista de quadros
- Colunas e cards com persistência
- Edição de título, adição, exclusão
- Mecanismo de drag and drop
- Prioridade dos cards

O Zustand é persistido com `zustand/middleware` e armazena os dados no `localStorage`.

---
