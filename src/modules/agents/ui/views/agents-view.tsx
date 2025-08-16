'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import EmptyState from '@/components/empty-state'

const AgentsView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
    <div className=" flex-1 flex flex-col pb-4 px-4 md:px-8 gap-y-4">
      {data.length === 0 ? (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. each agent will follow your instructions and can interact with participants during the call."
        />
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  )
}

export default AgentsView
