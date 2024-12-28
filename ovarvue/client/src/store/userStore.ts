import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

interface UserStoreState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set) => ({
        email: null,
        firstName: null,
        lastName: null,
        setUser: (user: User) =>
          set(() => ({
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
          })),
        removeUser: () =>
          set(() => ({ email: null, firstName: null, lastName: null })),
      }),
      {
        name: "user-storage",
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

export default useUserStore;
