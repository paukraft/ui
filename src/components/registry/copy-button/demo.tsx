import { CopyButton } from './component'

export const CopyButtonDemo = () => {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Invite Friends</h3>
        <p className="text-sm text-muted-foreground">
          Share this exclusive code with friends to unlock special rewards
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 rounded-lg border bg-background/80 backdrop-blur-sm p-3 w-fit">
          <code className="text-sm font-mono font-medium">
            FRIEND-2024-SPRING
          </code>
          <CopyButton text="FRIEND-2024-SPRING" />
        </div>

        <div className="text-xs text-muted-foreground">
          Valid until April 30, 2024
        </div>
      </div>

      <div className="text-xs text-muted-foreground/80">
        *Each code can be used up to 5 times
      </div>
    </div>
  )
}
