'use client'

import { Button } from '@/components/ui/button'

import { PlusIcon } from 'lucide-react'
import NewMeetingDialog from './new-meeting-dialog'
import { useState } from 'react'

//import { DEFAULT_PAGE } from '@/constants'

const MeetingsListHeader = () => {
  //   const [filters, setFilters] = UseAgentsFilters()
  //
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  //
  //   const isAnyFieldModified = !!filters.search
  //
  //   const onClearFields = () => {
  //     setFilters({
  //       search: '',
  //       page: DEFAULT_PAGE,
  //     })
  //   }

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
        <div className="flex items-center gap-x-2 p-1">
          {/* <AgentsSearchFilter />
          {isAnyFieldModified && (
            <Button variant="outline" size="sm" onClick={() => onClearFields()}>
              <XCircleIcon />
            </Button>
          )} */}
        </div>
      </div>
    </>
  )
}

export default MeetingsListHeader
