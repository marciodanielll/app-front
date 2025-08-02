export interface JourneyEntry {
  id?: string;
  title: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateJournalDTO {
  title: string;
  text: string;
}

export interface JourneyState {
  entries: JourneyEntry[];
  currentEntry: JourneyEntry | null;
  isLoading: boolean;
}

export interface JourneyActions {
  addEntry: (
    entry: Omit<JourneyEntry, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateEntry: (id: string, entry: Partial<JourneyEntry>) => void;
  deleteEntry: (id: string) => void;
  setCurrentEntry: (entry: JourneyEntry | null) => void;
  loadEntries: (entries: JourneyEntry[]) => void;
  setJourneyLoading: (loading: boolean) => void;
  clearJourney: () => void;
}
