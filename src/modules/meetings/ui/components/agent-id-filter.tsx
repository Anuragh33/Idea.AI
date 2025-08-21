import { useState } from 'react'

import { useTRPC } from '@/trpc/client'

import UseMeetingsFilters from '../../hooks/use-meetings-filters'

import { useQuery } from '@tanstack/react-query'

import CommandSelect from '@/components/command-select'

import GeneratedAvatar from '@/components/generated-avatar'

const AgentIdFilter = () => {
  const [filters, setFilters] = UseMeetingsFilters()

  const trpc = useTRPC()

  const [agentSearch, setAgentSearch] = useState('')

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  )

  return (
    <CommandSelect
      classname="h-9"
      placeHolder="Agents"
      value={filters.agentId ?? ''}
      onSearch={setAgentSearch}
      onSelect={(value) => setFilters({ agentId: value })}
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={agent.name}
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
    />
  )
}

export default AgentIdFilter
