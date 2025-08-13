import ResponsiveDialog from '@/components/responsive-dialog'
import AgentsForm from './agents-form'

interface NewAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NewAgentDialog = ({ onOpenChange, open }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}

export default NewAgentDialog
