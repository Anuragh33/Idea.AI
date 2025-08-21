import ResponsiveDialog from '@/components/responsive-dialog'

import MeetingForm from './meetings-form'

import { MeetingGetOne } from '../../types'

interface NewMeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: MeetingGetOne
}

const UpdateMeetingDialog = ({
  onOpenChange,
  open,
  initialValues,
}: NewMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Change the Meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}

export default UpdateMeetingDialog
