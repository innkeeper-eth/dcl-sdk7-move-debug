import { Entity } from '@dcl/sdk/ecs'

export type Coord = 'x' | 'y' | 'z'
export type MutButton = {
  entity: Entity
  coord: Coord
  isPlus: boolean
}
