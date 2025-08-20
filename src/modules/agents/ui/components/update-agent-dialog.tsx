import ResponsiveDialog from '@/components/responsive-dialog'
import AgentsForm from './agents-form'
import { AgentGetOne } from '../../types'

interface UpdateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues?: AgentGetOne
}

const UpdateAgentDialog = ({
  onOpenChange,
  open,
  initialValues,
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}

export default UpdateAgentDialog
