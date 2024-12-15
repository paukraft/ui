import { registryComponents } from '@/components/registry'

export const getRegistryUrlFromComponent = ({
  component,
}: {
  component?: (typeof registryComponents)[number]
}) => `https://ui.paukraft.com/r/${component?.path || ''}`

export const parseRegistryDependency = ({
  dependency,
}: {
  dependency: string
}) => {
  return dependency.replace('pau-', getRegistryUrlFromComponent({}))
}
