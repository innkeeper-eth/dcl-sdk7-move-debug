import { Entity, Transform } from '@dcl/sdk/ecs'
import { state } from './state'
import { Quaternion } from '@dcl/sdk/math'

export function getEntityStats(entity: Entity, stat: 'scale' | 'rotation' | 'position' = 'position') {
  const entityPosition = Transform.getMutable(entity)
  if (!entityPosition) return ' no data yet'
  if (stat === 'rotation') {
    const { x, y, z } = Quaternion.toEulerAngles(entityPosition.rotation)
    return parseEulerToString({ x, y, z })
  }
  const { x, y, z } = entityPosition[stat]
  return parseCoordsToString({ x, y, z })
}

export function toggleState() {
  switch (state.stat) {
    case 'position':
      state.stat = 'rotation'
      break
    case 'rotation':
      state.stat = 'scale'
      break
    case 'scale':
      state.stat = 'position'
      break
  }
}

export function parseCoordsToString(props: { x: number; y: number; z: number }) {
  const { x, y, z } = props
  return `X: ${x.toFixed(3)} 
Y:${y.toFixed(3)} 
Z:${z.toFixed(3)} `
}

export function parseEulerToString(props: { x: number; y: number; z: number }) {
  const { x, y, z } = props
  return `Quaternion
.toEulerAngles
(${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)})`
}
