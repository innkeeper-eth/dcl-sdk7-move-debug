import { MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { setupUi } from './ui'
import { Vector3 } from '@dcl/sdk/math'

export function main() {
  // draw UI

  const Cube = engine.addEntity()
  MeshRenderer.setBox(Cube)
  Transform.create(Cube, {
    position: Vector3.create(8, 1, 8)
  })

  setupUi(Cube)
}
