'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'

type CustomProp = {
  description: string
  type: string
  required: boolean
  defaultValue?: any
}

type CustomPropsMap = {
  [key: string]: CustomProp
}

type CustomPropsDemoProps = {
  component: React.ComponentType<any>
  customProps: CustomPropsMap
}

const Inputs: Record<
  string,
  React.ComponentType<{
    value: any
    onChange: (value: any) => void
  }>
> = {
  number: (props) => (
    <Input
      type="number"
      value={props.value as number}
      onChange={(e) => props.onChange(Number(e.target.value))}
      className="max-w-[200px]"
    />
  ),
  string: (props) => (
    <Input
      type="text"
      value={props.value as string}
      onChange={(e) => props.onChange(e.target.value)}
      className="max-w-[200px]"
    />
  ),
  boolean: (props) => (
    <Checkbox
      checked={props.value as boolean}
      onCheckedChange={props.onChange}
    />
  ),
}

export const CustomPropsDemo = ({
  component: Component,
  customProps,
}: CustomPropsDemoProps) => {
  const [value, setValue] = useState([50])
  const [props, setProps] = useState(() => {
    const initialProps: Record<string, any> = {}
    Object.entries(customProps).forEach(([key, prop]) => {
      const type = prop.type.toLowerCase()
      initialProps[key] = type in Inputs ? prop.defaultValue : undefined
    })
    return initialProps
  })

  const handlePropChange = (key: string, value: any) => {
    setProps((prev) => ({ ...prev, [key]: value }))
  }

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    handlePropChange('value', newValue)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5">
        {Object.entries(customProps).map(([key, prop]) => {
          const type = prop.type.toLowerCase()
          const InputComponent = (Inputs as any)[type]

          return (
            <div key={key} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>{key}</Label>
                  {prop.required && <span className="text-destructive">*</span>}
                </div>
              </div>
              {InputComponent ? (
                <InputComponent
                  value={props[key]}
                  onChange={(value: any) => handlePropChange(key, value)}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No input available for type: {prop.type}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {prop.description}
              </p>

              {prop.defaultValue && (
                <span className="text-muted-foreground text-xs">
                  Default:{' '}
                  <span className="text-foreground">
                    {prop.defaultValue.toString()}
                  </span>
                </span>
              )}
            </div>
          )
        })}
        {Object.entries(customProps).length === 0 && (
          <p className="text-sm text-muted-foreground">
            This component has no custom props
          </p>
        )}
      </div>
      <Component {...props} value={value} onValueChange={handleValueChange} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label>Value</Label>
            {customProps.value?.required && (
              <span className="text-destructive">*</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {customProps.value?.defaultValue && (
              <span>Default: {customProps.value.defaultValue[0]}</span>
            )}
            <span>Current: {value[0]}</span>
          </div>
        </div>
        <Slider value={value} onValueChange={handleValueChange} />
      </div>
    </div>
  )
}
