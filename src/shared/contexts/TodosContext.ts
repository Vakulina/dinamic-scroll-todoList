import { createContext } from "react";
import { CardProps } from "../components/Card";

export const TodosContext = createContext<{
  cards: CardProps[];
  loadCards: () => void;
}>({
  cards: [],
  loadCards: () => Promise.resolve(),
});
