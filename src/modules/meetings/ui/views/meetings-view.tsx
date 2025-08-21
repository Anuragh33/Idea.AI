'use client'

import { useRouter } from 'next/navigation'

import { DataTable } from '@/components/data-table'
import EmptyState from '@/components/empty-state'

import { useTRPC } from '@/trpc/client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { columns } from '../components/columns'

const MeetingsView = () => {
  const router = useRouter()
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {data.items.length === 0 ? (
        <EmptyState
          title=" Start your first Meeting"
          description=" Bring your best ideas, share your clear intentions, and make decisions with confidence."
        />
      ) : (
        <DataTable
          data={data.items}
          columns={columns}
          rowClick={(row) => router.push(`/meetings/${row.id}`)}
        />
      )}
      {/* {data.items.length !== 0 && (
        <DataPagination
          page={filters.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setFilters({ page })}
        />
      )} */}
    </div>
  )
}

export default MeetingsView
