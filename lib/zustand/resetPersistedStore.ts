export const resetPersistedStore = (storageKey: string) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(storageKey);
  } catch (err) {
    console.error(`Failed to clear persisted store: ${storageKey}`, err);
  }
};
