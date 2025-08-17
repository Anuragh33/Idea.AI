//import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

import { useTRPC } from '@/trpc/client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { agentsInsertSchema } from '../../schema'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import GeneratedAvatar from '@/components/generated-avatar'

import { AgentGetOne } from '../../types'

import { toast } from 'sonner'

interface AgentFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  initialValues?: AgentGetOne
}

const AgentsForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  //const router = useRouter()

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        )

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          )
        }
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      instructions: initialValues?.instructions ?? '',
    },
  })

  const isEdit = !!initialValues?.id
  const isPending = createAgent.isPending

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log('TODO: update Agent')
    } else {
      createAgent.mutate(values)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch('name')}
          variant="botttsNeutral"
          className="border size-16"
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {' '}
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. coding tutor" />
              </FormControl>{' '}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {' '}
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g. you are a helpful coding assistant by explaining concepts clearly and giving me small practical exercises to try"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              disabled={isPending}
              type="button"
              variant="ghost"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit" variant="default">
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AgentsForm
