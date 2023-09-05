import { createContext } from "react";
import { EventDto } from "../../api/dto/Event";

export const TodoContext = createContext<{
    cards: EventDto[];
    loadCards: () => void;
  }>({
    cards: [],
    loadCards: () => Promise.resolve(),
  });
  