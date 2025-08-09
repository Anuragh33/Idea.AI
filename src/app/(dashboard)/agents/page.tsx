import { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import ErrorState from '@/components/error-state'
import LoadingState from '@/components/loading-state'

import AgentsView from '@/modules/agents/ui/views/agents-view'

import { ErrorBoundary } from 'react-error-boundary'

const Page = () => {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.agents.getMan.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agents"
            description=" This may take few seconds..."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Loading Agents"
              description=" This may take few seconds..."
            />
          }
        >
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
