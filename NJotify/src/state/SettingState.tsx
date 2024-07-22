import { create } from 'zustand'

type State = {
  setting: string
}

type Action = {
  changeSetting: (setting: State['setting']) => void
}

const useSettingStore = create<State & Action>((set) => ({
  setting: 'menu',
  changeSetting: (setting) => set(() => ({ setting: setting })),
}))

export default useSettingStore