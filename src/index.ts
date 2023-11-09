import { MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { debugModal } from './debugModal'

export function main() {
  const Cube = engine.addEntity()
  MeshRenderer.setBox(Cube)
  Transform.create(Cube, {
    position: Vector3.create(8, 1, 8)
  })
  debugModal(Cube)
}
