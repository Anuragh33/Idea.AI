'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

const AgentsView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMan.queryOptions())

  return <div>{JSON.stringify(data, null, 2)}</div>
}

export default AgentsView
