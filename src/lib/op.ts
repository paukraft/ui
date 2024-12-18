import { OpenPanel } from '@openpanel/nextjs'

export const op = new OpenPanel({
  clientId: process.env.OPENPANEL_CLIENT_ID as string,
  clientSecret: process.env.OPENPANEL_SECRET as string,
})
