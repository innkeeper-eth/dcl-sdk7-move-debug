export type State = {
  stat: 'position' | 'rotation' | 'scale'
  scale: number
}
export const state: State = {
  stat: 'position',
  scale: 0.1
}
