'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

const MeetingsView = () => {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

  return <div>{}</div>
}

export default MeetingsView
