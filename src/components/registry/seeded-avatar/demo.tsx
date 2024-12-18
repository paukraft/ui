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
            <SeededAvatar seed="someone@company.com" size="sm" />
            <div className="rounded-lg bg-muted px-3 py-2">
              <p className="text-sm">
                Hey team, how&apos;s the project coming along?
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="rounded-lg bg-primary px-3 py-2 text-primary-foreground">
              <p className="text-sm">Making good progress! Will update soon.</p>
            </div>
            <SeededAvatar seed="current.user@company.com" size="sm" />
          </div>
        </div>
      </div>

      {/* Team members list example */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Team Members</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SeededAvatar
              seed="alex.martinez@company.com"
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
              seed="jessica.chen@company.com"
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

      {/* All variants and sizes example */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">All Variants & Sizes</h3>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Character Variant</p>
            <div className="flex items-center gap-4">
              <SeededAvatar
                seed="avatar.custom@test.com"
                variant="character"
                className="size-16"
              />
              <SeededAvatar
                seed="avatar.lg@test.com"
                size="lg"
                variant="character"
              />
              <SeededAvatar
                seed="avatar.default@test.com"
                size="default"
                variant="character"
              />
              <SeededAvatar
                seed="avatar.sm@test.com"
                size="sm"
                variant="character"
              />
            </div>
          </div>
          {/* <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Marble Variant</p>
            <div className="flex items-center gap-4">
              <SeededAvatar seed="avatar.lg@test.com" size="lg" variant="marble" />
              <SeededAvatar seed="avatar.default@test.com" size="default" variant="marble" />
              <SeededAvatar seed="avatar.sm@test.com" size="sm" variant="marble" />
              <SeededAvatar seed="avatar.xs@test.com" size="xs" variant="marble" />
            </div>
          </div> */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Shape Variant</p>
            <div className="flex items-center gap-4">
              <SeededAvatar
                seed="avatar.custom@test.com"
                size="lg"
                variant="shape"
                className="size-16"
              />
              <SeededAvatar
                seed="avatar.lg@test.com"
                size="lg"
                variant="shape"
              />
              <SeededAvatar
                seed="avatar.default@test.com"
                size="default"
                variant="shape"
              />
              <SeededAvatar
                seed="avatar.sm@test.com"
                size="sm"
                variant="shape"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
