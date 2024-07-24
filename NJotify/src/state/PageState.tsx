import { create } from 'zustand'

type State = {
  page: string
  currIndex: number
}

type Action = {
  changePage: (page: State['page']) => void
}

const usePageStore = create<State & Action>((set) => ({
  page: 'home',
  currIndex: 0,
  changePage: (page) => set(() => ({ page: page })),
}))

export default usePageStore