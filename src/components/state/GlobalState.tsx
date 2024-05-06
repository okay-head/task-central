import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
type State = {
  user: TUser | null
}
type Actions = {
  setUser: (x: TUser | null) => void
}
type T = State & Actions

const useGlobalStore = create<T>()(
  persist(
    (set) => ({
      user: null,

      setUser: (x) => set(() => ({ user: x })),
    }),
    {
      name: 'global-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useGlobalStore
