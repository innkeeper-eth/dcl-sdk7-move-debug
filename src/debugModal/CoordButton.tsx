import { Transform } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button } from '@dcl/sdk/react-ecs'
import { Coord, MutButton } from './types'
import { state } from './state'

export const MutableButton = ({ entity, coord, isPlus }: MutButton) => {
  return (
    <Button
      uiTransform={{ width: 40 }}
      value={`${coord}${isPlus ? '+' : '-'}`}
      variant="primary"
      fontSize={14}
      onMouseDown={() => {
        const entityPosition = Transform.getMutable(entity)
        if (!entityPosition) return ' no data yet'
        const adjustment = state.scale * (isPlus ? 1 : -1)
        if (state.stat === 'rotation') {
          const eulerRotations = Quaternion.toEulerAngles(entityPosition.rotation)
          const nudge = (c: Coord) => (c === coord ? adjustment : 0)
          entityPosition.rotation = Quaternion.fromEulerDegrees(
            eulerRotations.x + nudge('x'),
            eulerRotations.y + nudge('y'),
            eulerRotations.z + nudge('z')
          )
          return
        }
        entityPosition[state.stat][coord] = entityPosition[state.stat][coord] + adjustment
      }}
    />
  )
}
