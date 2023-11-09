import { engine, Entity, Transform } from '@dcl/sdk/ecs'
import { Color4, Quaternion } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

type State = {
  stat: 'position' | 'rotation' | 'scale'
  scale: 1 | 0.1 | 0.01 | 0.001 | 0.0001
}
const state: State = {
  stat: 'position',
  scale: 0.1
}

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
      <Button
        value={state.scale.toString()}
        fontSize={18}
        uiTransform={{ width: '75%', margin: '10px 0' }}
        onMouseDown={toggleScale}
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
    return `X: ${x.toFixed(3)} 
Y:${y.toFixed(3)} 
Z:${z.toFixed(3)} `
  }
  const { x, y, z } = entityPosition[stat]
  return `X: ${x.toFixed(3)} 
Y:${y.toFixed(3)} 
Z:${z.toFixed(3)} `
}

type MutButton = {
  entity: Entity
  coord: 'x' | 'y' | 'z'
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
          const rotTweak = Quaternion.toEulerAngles(entityPosition.rotation)[coord] + adjustment
          entityPosition.rotation[coord] = rotTweak
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

function toggleScale() {
  switch (state.scale) {
    case 1:
      state.scale = 0.1
      break
    case 0.1:
      state.scale = 0.01
      break
    case 0.01:
      state.scale = 0.001
      break
    case 0.001:
      state.scale = 1
      break
  }
}
