import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Preference {
  age: string;
  label: string;
  date: string;
  startDate: string;
  endDate: string;
  gender: string;
}

interface PreferenceStoreState {
  age: string | undefined;
  label: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  gender: string | undefined;
  setPreference: (preference: Preference) => void;
}

const usePreferenceStore = create<PreferenceStoreState>()(
  devtools(
    persist(
      (set) => ({
        age: undefined,
        label: undefined,
        startDate: undefined,
        endDate: undefined,
        gender: undefined,

        setPreference: (preference: Preference) => {
          set(() => ({
            age: preference.age,
            label: preference.label,
            startDate: preference.startDate,
            endDate: preference.endDate,
            gender: preference.gender,
          }));
        },
      }),
      {
        name: "preference-storage",
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            return str ? JSON.parse(str) : null;
          },
          setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    )
  )
);

export default usePreferenceStore;
