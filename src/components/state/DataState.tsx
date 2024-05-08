import { create } from 'zustand'
// types
type State = {
  tasks: TMongoObject[] | null
}
type Actions = {
  setTasks: (x: TMongoObject[] | null) => void
}
type T = State & Actions

// store creation
const useDataStore = create<T>()((set) => ({
  tasks: null,

  setTasks: (x) => set(() => ({ tasks: x })),
}))

export default useDataStore
