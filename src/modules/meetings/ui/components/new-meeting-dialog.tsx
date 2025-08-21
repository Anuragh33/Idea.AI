import { useRouter } from 'next/navigation'

import ResponsiveDialog from '@/components/responsive-dialog'

import MeetingForm from './meetings-form'

interface NewMeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NewMeetingDialog = ({ onOpenChange, open }: NewMeetingDialogProps) => {
  const router = useRouter()

  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Start a Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onCancel={() => onOpenChange(false)}
        onSuccess={(id) => {
          onOpenChange(false)
          router.push(`/meetings/${id}`)
        }}
      />
    </ResponsiveDialog>
  )
}

export default NewMeetingDialog
