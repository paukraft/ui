import DocsSidebar from '@/components/docs-sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex container mx-auto flex-1">
      <DocsSidebar />
      <div className="flex-1 max-w-full overflow-hidden">{children}</div>
    </div>
  )
}
