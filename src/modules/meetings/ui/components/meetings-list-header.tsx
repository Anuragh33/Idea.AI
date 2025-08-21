'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { PlusIcon, XCircleIcon } from 'lucide-react'

import NewMeetingDialog from './new-meeting-dialog'

import MeetingsSearchFilter from './meetings-search-filter'

import StatusFilter from './status-filter'

import AgentIdFilter from './agent-id-filter'

import UseMeetingsFilters from '../../hooks/use-meetings-filters'
import { DEFAULT_PAGE } from '@/constants'

const MeetingsListHeader = () => {
  const [filters, setFilters] = UseMeetingsFilters()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isAnyFieldModified =
    !!filters.search || !!filters.agentId || !!filters.status

  const onClearFilters = () => {
    setFilters({
      search: '',
      status: null,
      agentId: '',
      page: DEFAULT_PAGE,
    })
  }

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button
            className="cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFieldModified && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onClearFilters()}
              >
                <XCircleIcon />
              </Button>
            )}
          </div>{' '}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}

export default MeetingsListHeader
