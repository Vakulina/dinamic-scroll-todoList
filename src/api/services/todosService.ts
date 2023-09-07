import { apiClient } from "..";
import { EventDto } from "../dto/Event";

const API_URL = import.meta.env.VITE_API_URL;

class TodosService {
  async fetchCards(query: number): Promise<EventDto[]> {
    try {
      const response = await apiClient.get<EventDto[]>(
        `${API_URL}?_page=${query}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching cards:", error);
      throw error;
    }
  }
}

export const todosService = new TodosService();
