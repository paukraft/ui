import { Button } from '@/components/ui/button'
import { SeededAvatar } from './component'

export const SeededAvatarDemo = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Message thread example */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Message Thread</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <SeededAvatar value="someone@company.com" size="sm" />
            <div className="rounded-lg bg-muted px-3 py-2">
              <p className="text-sm">
                Hey team, how's the project coming along?
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="rounded-lg bg-primary px-3 py-2 text-primary-foreground">
              <p className="text-sm">Making good progress! Will update soon.</p>
            </div>
            <SeededAvatar value="current.user@company.com" size="sm" />
          </div>
        </div>
      </div>

      {/* Team members list example */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Team Members</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SeededAvatar
              value="alex.martinez@company.com"
              variant="character"
              size="default"
            />
            <div>
              <p className="text-sm font-medium">Alex Martinez</p>
              <p className="text-xs text-muted-foreground">Product Designer</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              View Profile
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <SeededAvatar
              value="jessica.chen@company.com"
              variant="character"
              size="default"
            />
            <div>
              <p className="text-sm font-medium">Jessica Chen</p>
              <p className="text-xs text-muted-foreground">
                Frontend Developer
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
