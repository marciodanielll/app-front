import { StateCreator } from "zustand";
import { JourneyState, JourneyActions, JourneyEntry } from "../../types/journey";
import { AuthState, AuthActions } from "../../types/auth";
import { UserState, UserActions } from "../../types/user";
import { AppState, AppActions } from "../../types/app";

export const initialJourneyState: JourneyState = {
  entries: [],
  currentEntry: null,
  isLoading: false,
};

interface CombinedStore {
  auth: AuthState & AuthActions;
  user: UserState & UserActions;
  app: AppState & AppActions;
  journey: JourneyState & JourneyActions;
  resetAll: () => void;
}

export const createJourneySlice: StateCreator<
  CombinedStore,
  [["zustand/devtools", never]],
  [],
  JourneyState & JourneyActions
> = (set) => ({
  ...initialJourneyState,

  addEntry: (entry) =>
    set(
      (state: CombinedStore) => {
        const newEntry: JourneyEntry = {
          ...entry,
          id: `journey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return {
          journey: {
            ...state.journey,
            entries: [newEntry, ...state.journey.entries],
            currentEntry: newEntry,
          },
        };
      },
      false,
      "journey/addEntry"
    ),

  updateEntry: (id, updatedEntry) =>
    set(
      (state: CombinedStore) => ({
        journey: {
          ...state.journey,
          entries: state.journey.entries.map(entry =>
            entry.id === id
              ? { ...entry, ...updatedEntry, updatedAt: new Date() }
              : entry
          ),
          currentEntry:
            state.journey.currentEntry?.id === id
              ? { ...state.journey.currentEntry, ...updatedEntry, updatedAt: new Date() }
              : state.journey.currentEntry,
        },
      }),
      false,
      "journey/updateEntry"
    ),

  deleteEntry: (id) =>
    set(
      (state: CombinedStore) => ({
        journey: {
          ...state.journey,
          entries: state.journey.entries.filter(entry => entry.id !== id),
          currentEntry:
            state.journey.currentEntry?.id === id
              ? null
              : state.journey.currentEntry,
        },
      }),
      false,
      "journey/deleteEntry"
    ),

  setCurrentEntry: (entry) =>
    set(
      (state: CombinedStore) => ({
        journey: {
          ...state.journey,
          currentEntry: entry,
        },
      }),
      false,
      "journey/setCurrentEntry"
    ),

  loadEntries: (entries) =>
    set(
      (state: CombinedStore) => ({
        journey: {
          ...state.journey,
          entries: entries.sort((a, b) => 
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          ),
        },
      }),
      false,
      "journey/loadEntries"
    ),

  setJourneyLoading: (loading) =>
    set(
      (state: CombinedStore) => ({
        journey: {
          ...state.journey,
          isLoading: loading,
        },
      }),
      false,
      "journey/setLoading"
    ),

  clearJourney: () =>
    set(
      (state: CombinedStore) => ({
        journey: {
          ...state.journey,
          ...initialJourneyState,
        },
      }),
      false,
      "journey/clear"
    ),
});
