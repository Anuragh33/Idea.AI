'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useTRPC } from '@/trpc/client'

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import MeetingIdViewHeader from '../components/meetingId-view-header'

import UseConfirm from '@/hooks/use-confirm'

import { toast } from 'sonner'
import UpdateMeetingDialog from '../components/update-meeting-dialog'

import UpcomingState from '../components/upcoming-state'
import ActiveState from '../components/active-state'
import CancelledState from '../components/cancelled-state'
import ProcessingState from '../components/processing-state'

interface Props {
  meetingId: string
}

const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const router = useRouter()

  const [RemoveConformation, confirmRemove] = UseConfirm(
    'Are you Sure? ',
    'The following action will remove this meeting'
  )

  const [updateMeetingDialog, setUpdateMeetingDialog] = useState(false)

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  )

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))

        router.push('/meetings')
        toast.success('Meeting is deleted')
      },
    })
  )

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove()

    if (!ok) return

    await removeMeeting.mutateAsync({ id: meetingId })
  }

  const isActive = data.status === 'Active'
  const isUpcoming = data.status === 'Upcoming'
  const isCancelled = data.status === 'Cancelled'
  const isCompleted = data.status === 'Completed'
  const isProcessing = data.status === 'Processing'

  return (
    <>
      <RemoveConformation />
      <UpdateMeetingDialog
        open={updateMeetingDialog}
        onOpenChange={setUpdateMeetingDialog}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-8 ">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => {
            setUpdateMeetingDialog(true)
          }}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && (
          <div>
            <CancelledState />
          </div>
        )}
        {isActive && (
          <div>
            <ActiveState meetingId={meetingId} />
          </div>
        )}
        {isProcessing && (
          <div>
            <ProcessingState />
          </div>
        )}{' '}
        {isUpcoming && (
          <div>
            <UpcomingState
              meetingId={meetingId}
              onCancelMeeting={() => {}}
              isCancelling={false}
            />
          </div>
        )}
        {isCompleted && <div>Completed</div>}{' '}
      </div>
    </>
  )
}

export default MeetingIdView
