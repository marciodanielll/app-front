import { apiService } from "./api";
import { CreateJournalDTO, JourneyEntry } from "../types/journey";

class JourneyService {
  async createJournal(
    data: CreateJournalDTO,
    token: string
  ): Promise<JourneyEntry> {
    return apiService.authorizedRequest<JourneyEntry>(
      "/journals",
      {
        method: "POST",
        data,
      },
      token
    );
  }

  async getJournals(token: string): Promise<JourneyEntry[]> {
    return apiService.authorizedRequest<JourneyEntry[]>(
      "/journals",
      {
        method: "GET",
      },
      token
    );
  }

  async getJournalById(id: string, token: string): Promise<JourneyEntry> {
    return apiService.authorizedRequest<JourneyEntry>(
      `/journals/${id}`,
      {
        method: "GET",
      },
      token
    );
  }

  async updateJournal(
    id: string,
    data: Partial<CreateJournalDTO>,
    token: string
  ): Promise<JourneyEntry> {
    return apiService.authorizedRequest<JourneyEntry>(
      `/journals/${id}`,
      {
        method: "PUT",
        data,
      },
      token
    );
  }

  async deleteJournal(id: string, token: string): Promise<void> {
    return apiService.authorizedRequest<void>(
      `/journals/${id}`,
      {
        method: "DELETE",
      },
      token
    );
  }
}

export const journeyService = new JourneyService();
export default journeyService;
