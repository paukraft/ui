import { OpenPanelComponent } from '@openpanel/nextjs'

export const TrackiTrack = async () => {
  return (
    <>
      <OpenPanelComponent
        apiUrl="/api/op"
        clientId={process.env.OPENPANEL_CLIENT_ID as string}
        trackScreenViews={true}
        trackOutgoingLinks={true}
      />
    </>
  )
}
