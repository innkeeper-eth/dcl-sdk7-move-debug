import { Entity } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { HStack, VStack } from './Transforms'
import { state } from './state'
import { getEntityStats } from './helpers'
import { MutableButton } from './CoordButton'

const scaleSizes = [10, 1, 0.1, 0.01]

export function debugModal(entity: Entity) {
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
