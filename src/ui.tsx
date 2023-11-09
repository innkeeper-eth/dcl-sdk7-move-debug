import { Entity, Transform } from '@dcl/sdk/ecs'
import { Color4, Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

type State = {
  stat: 'position' | 'rotation' | 'scale'
  scale: number
}
const state: State = {
  stat: 'position',
  scale: 0.1
}

const scaleSizes = [10, 1, 0.1, 0.01]

const VStack = {
  width: 'auto',
  flexDirection: 'column',
  alignItems: 'center'
} as const
const HStack = {
  width: 'auto',
  flexDirection: 'row',
  alignItems: 'center'
} as const

export function setupUi(entity: Entity) {
  console.log('ReactEcs initiated:', !!ReactEcs)
  ReactEcsRenderer.setUiRenderer(() => uiComponent(entity))
}

const uiComponent = (entity: Entity) => (
  <UiEntity
    uiTransform={{
      width: 400,
      height: 230,
      margin: { top: '35px', left: '500px' },
      padding: 4
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
      uiBackground={{ color: Color4.fromHexString('#70ac76ff') }}
    >
      <Button value={state.stat} fontSize={18} uiTransform={{ width: '100%' }} onMouseDown={toggleState} />
      <Label value={`${getEntityStats(entity, state.stat)}`} fontSize={18} uiTransform={{ width: '100%' }} />
    </UiEntity>
    <UiEntity uiTransform={{ ...VStack, justifyContent: 'center', height: '100%', width: '100%' }}>
      <UiEntity uiTransform={HStack}>
        {scaleSizes.map((num) => (
          <Button
            value={num.toString()}
            fontSize={10}
            uiTransform={{ width: 'auto', margin: '10px 2px', padding: '5px' }}
            onMouseDown={() => {
              state.scale = num
            }}
          />
        ))}
      </UiEntity>
      <Label
        value={'Scale: ' + state.scale.toString()}
        fontSize={18}
        uiTransform={{ width: '75%', height: '40px', margin: '10px 0' }}
      />
      <UiEntity uiTransform={HStack}>
        <MutableButton entity={entity} coord="x" isPlus={true} />
        <MutableButton entity={entity} coord="x" isPlus={false} />
      </UiEntity>
      <UiEntity uiTransform={HStack}>
        <MutableButton entity={entity} coord="y" isPlus={true} />
        <MutableButton entity={entity} coord="y" isPlus={false} />
      </UiEntity>
      <UiEntity uiTransform={HStack}>
        <MutableButton entity={entity} coord="z" isPlus={true} />
        <MutableButton entity={entity} coord="z" isPlus={false} />
      </UiEntity>
    </UiEntity>
  </UiEntity>
)

function getEntityStats(entity: Entity, stat: 'scale' | 'rotation' | 'position' = 'position') {
  const entityPosition = Transform.getMutable(entity)
  if (!entityPosition) return ' no data yet'
  if (stat === 'rotation') {
    const { x, y, z } = Quaternion.toEulerAngles(entityPosition.rotation)
    return parseEulerToString({ x, y, z })
  }
  const { x, y, z } = entityPosition[stat]
  return parseCoordsToString({ x, y, z })
}

type Coord = 'x' | 'y' | 'z'
type MutButton = {
  entity: Entity
  coord: Coord
  isPlus: boolean
}
const MutableButton = ({ entity, coord, isPlus }: MutButton) => {
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

function toggleState() {
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

function parseCoordsToString(props: { x: number; y: number; z: number }) {
  const { x, y, z } = props
  return `X: ${x.toFixed(3)} 
Y:${y.toFixed(3)} 
Z:${z.toFixed(3)} `
}

function parseEulerToString(props: { x: number; y: number; z: number }) {
  const { x, y, z } = props
  return `Quaternion
.toEulerAngles
(${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)})`
}
