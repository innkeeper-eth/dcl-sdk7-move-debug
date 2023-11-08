import { engine } from '@dcl/sdk/ecs'

import { bounceScalingSystem, circularSystem } from './systems'

import { setupUi } from './ui'
import { createCube } from './factory'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(bounceScalingSystem)

export function main() {
  // draw UI
  setupUi()

  createCube(8, 1, 8)
}
