import { create } from 'zustand'
// types
type State = {
  tasks: TMongoObject[]
}
type Actions = {
  setTasks: (x: TMongoObject[]) => void
}
type T = State & Actions

// store creation
const useDataStore = create<T>()((set) => ({
  tasks: [],

  setTasks: (x) => set(() => ({ tasks: x })),
}))

export default useDataStore
