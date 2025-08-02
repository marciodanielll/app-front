import { useStore } from "../store";

export const useJourneyEntries = () =>
  useStore((state) => state.journey.entries);
export const useCurrentJourneyEntry = () =>
  useStore((state) => state.journey.currentEntry);
export const useJourneyLoading = () =>
  useStore((state) => state.journey.isLoading);

export const useAddJourneyEntry = () =>
  useStore((state) => state.journey.addEntry);
export const useUpdateJourneyEntry = () =>
  useStore((state) => state.journey.updateEntry);
export const useDeleteJourneyEntry = () =>
  useStore((state) => state.journey.deleteEntry);
export const useSetCurrentJourneyEntry = () =>
  useStore((state) => state.journey.setCurrentEntry);
export const useLoadJourneyEntries = () =>
  useStore((state) => state.journey.loadEntries);
export const useSetJourneyLoading = () =>
  useStore((state) => state.journey.setJourneyLoading);
export const useClearJourney = () =>
  useStore((state) => state.journey.clearJourney);
