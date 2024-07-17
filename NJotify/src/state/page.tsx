import { create } from 'zustand'

type State = {
  page: string
}

type Action = {
  changePage: (page: State['page']) => void
}

const usePageStore = create<State & Action>((set) => ({
  page: 'maintab',
  changePage: (page) => set(() => ({ page: page })),
}))

export default usePageStore