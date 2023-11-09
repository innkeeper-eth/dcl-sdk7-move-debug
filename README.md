# DCL SDK7 Mover Debug Tool

This is a small tool to help position things in-world so that you can type the same coordinates with code.

Use this tool by copying `debugModal` folder and using the function `debugModal(Entity)` with the entity you wish to debug.

https://github.com/innkeeper-eth/dcl-sdk7-move-debug/assets/28109194/e105ac5d-5260-413d-a169-eabab4c66fb7

https://github.com/innkeeper-eth/dcl-sdk7-move-debug/assets/28109194/03d6c407-a5c8-4132-8b66-6c08f90f7016

## Getting Started

This project was created with DCL SDK7 using the CLI to init a new project
`npx @dcl/sdk-commands init`

In your SDK7 project, copy/paste the `debugModal` folder into your project.

Then wrap the entity you wish to manipulate. Use the numbers on screen to manually adjust your code.
```
import { debugModal } from './debugModal'

export function main() {
  const Cube = engine.addEntity()
  MeshRenderer.setBox(Cube)
  Transform.create(Cube, {
    position: Vector3.create(8, 1, 8)
  })
  debugModal(Cube)
}
```

Make sure you delete the folder before pushing to production! Will add flags to prevent this automatically in the future.


## Credits

Made by [grins](https://twitter.com/deandotland) for [innkeeper.eth](https://twitter.com/innkeeperdoteth)
