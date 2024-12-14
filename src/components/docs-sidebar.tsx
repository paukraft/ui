import { DocsNav } from './docs-nav'

const DocsSidebar = () => {
  return (
    <div className="hidden md:block w-64 border-r">
      <div className="sticky top-0 p-6">
        <DocsNav />
      </div>
    </div>
  )
}

export default DocsSidebar
